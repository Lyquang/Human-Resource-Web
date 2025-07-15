
import React, { useState, useEffect } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaTransgender, FaIdCard } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css"
import DefaultPhoto from "../assets/defaut_pho.png"; // Adjust the path as necessary

const EmployeeInfor = () => {
  const [profile, setProfile] = useState({
    name: "",
    position: "",
    phone: "",
    email: "",
    address: "",
    department: "",
    profileImage: "",
    firstName: "",
    lastName: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const token = localStorage.getItem("token");
        const accountId = localStorage.getItem("accountId");
        const personnelCode = localStorage.getItem("personelCode");

        console.log("accountIDdđ",accountId );

        // console.log("personel code",personnelCode );

        if (!token || !accountId) {
          setError("Authentication token or account ID not found");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:8080/api/employee/account?id=${accountId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }

        // dong này important
        const data = await response.json()
        localStorage.setItem("personelCode", data.personelCode);
         console.log("personelCode >>>> ", data.personelCode);

        setProfile({
          personelCode: data.personelCode,
          firstName: data.firstName,
          lastName: data.lastName,
          name: `${data.lastName} ${data.firstName}`,
          email: data.email,
          phone: data.phone,
          address: `${data.street}, ${data.city}`,
          department: data.departmentName,
          position: data.position,
          profileImage: data.avatar,
          gender: data.gender,
          taskList : data.taskList || [],
          tasksCompleteNumber: data.tasksCompleteNumber || 0,
          projectList: data.projectList || [],
          projectInvolved: data.projectInvolved || 0,
        });

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      setIsEditing(false);
      const token = localStorage.getItem("token");
      const personnelCode = localStorage.getItem("personelCode");

      console.log("personel code",personnelCode );

      const updatedData = {
        street: profile.address.split(",")[0],
        city: profile.address.split(",")[1],
        phone: profile.phone,
        email: profile.email,
      };

      const response = await fetch(
        `http://localhost:8080/api/employee/update?personnel_code=${personnelCode}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update employee data");
      }

      setProfile((prevProfile) => ({
        ...prevProfile,
        address: `${updatedData.street}, ${updatedData.city}`,
        phone: updatedData.phone,
        email: updatedData.email,
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || file.type !== "image/png") {
      alert("Please upload a PNG image");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:8080/api/images/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setProfile((prevProfile) => ({
        ...prevProfile,
        profileImage: data.imageUrl,
      }));
    } catch (err) {
      console.error("Error uploading avatar:", err);
    }
  };

 if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error) return <div className="alert alert-danger my-5">{error}</div>;

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <img
                  src={profile.profileImage || DefaultPhoto}
                  alt="Employee Profile"
                  className="rounded-circle mr-4"
                  style={{ width: "12rem", height: "12rem", objectFit: "cover" }}
                />
                <div>
                  <h2 className="display-3" style={{marginLeft: "2rem"}}>{profile.name}</h2>
                  <p className="text-muted display-7" style={{marginLeft: "2rem"}}>{profile.position}</p>
                </div>
              </div>

              <div className="mb-4">
                <label className="btn btn-outline-primary btn-sm mb-0">
                  <input
                    type="file"
                    accept="image/png"
                    onChange={handleAvatarUpload}
                    className="d-none"
                  />
                  Chọn ảnh đại diện
                </label>
              </div>

              <div className="row">
                <div className=" col-md-6 mb-3">
                  <h5>Thông tin cá nhân</h5>
                  {isEditing ? (
                    <form>
                      <div className="form-group">
                        <label>Gender</label>
                        <input
                          type="text"
                          value={profile.gender}
                          onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone</label>
                        <input
                          type="text"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Street</label>
                        <input
                          type="text"
                          value={profile.address.split(",")[0]}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              address: `${e.target.value}, ${profile.address.split(",")[1]}`,
                            })
                          }
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>City</label>
                        <input
                          type="text"
                          value={profile.address.split(",")[1]}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              address: `${profile.address.split(",")[0]}, ${e.target.value}`,
                            })
                          }
                          className="form-control"
                        />
                      </div>
                    </form>
                  ) : (
                    <ul className="list-unstyled mb-0">
                      <li>
                        <FaIdCard className="mr-2" /> <strong>Mã số nhân viên:</strong> {profile.personelCode}
                      </li>
                      <li>
                        <FaPhone className="mr-2" /> <strong>Số điện thoại:</strong> {profile.phone}
                      </li>
                      <li>
                        <FaTransgender className="mr-2" /> <strong>Giới tính:</strong> {profile.gender}
                      </li>
                      <li>
                        <FaEnvelope className="mr-2" /> <strong>Email:</strong> {profile.email}
                      </li>
                      <li>
                        <FaMapMarkerAlt className="mr-2" /> <strong>Địa chỉ:</strong> {profile.address}
                      </li>
                    </ul>
                  )}
                </div>
                <ul className="list-unstyled mb-0 col-md-6">
                    <h5>Thông tin công việc</h5>
                    <li>
                      <FaBriefcase className="mr-2" /> <strong>Phòng ban:</strong> {profile.department}
                    </li>
                    <li>
                      <FaBriefcase className="mr-2" /> <strong>Số công việc chưa hoàn thành:</strong> {profile.taskList.length}
                    </li>
                    <li>
                      <FaBriefcase className="mr-2" /> <strong>Số công việc đã hoàn thành:</strong> {profile.tasksCompleteNumber}
                    </li>
                    <li>
                      <FaBriefcase className="mr-2" /> <strong>Số dự án chưa hoàn thành:</strong> {profile.projectList.length}
                    </li>
                    <li>
                      <FaBriefcase className="mr-2" /> <strong>Số dự án đã hoàn thành:</strong> {profile.projectsCompleteNumber}
                    </li>
                </ul>

              </div>

              <div className="text-right mt-4"> 
                {isEditing ? (
                  <button className="btn btn-success mr-2" onClick={handleSave}>
                    Lưu
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={toggleEditMode}>
                    Chỉnh sửa
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EmployeeInfor;
