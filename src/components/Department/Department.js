import React, { useEffect, useState } from "react";
import "./Department.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { getAllDepartment, postCreateNewDepartment } from "../services/apiService";
import axios from "../utils/axiosCustomize";


const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    managerId: "",
  });

  const fetchDepartments = async () => {
    try {
      const response = await getAllDepartment();
      if (response && response.data) {
        setDepartments(response.data.result); // Update to use "result" from API response
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching departments:", err);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openForm = () => {
    setShowForm(true);
    setFormData({
      name: "",
      managerId: "",
    });
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({
      name: "",
      managerId: "",
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const payload = {
        departmentName: formData.name,
        managerId: formData.managerId ? Number(formData.managerId) : null, // Ensure managerId is numeric or null
      };
  
      const response = await postCreateNewDepartment(payload);
  
      if (response && response.data && response.data.result) {
        // Add the newly created department to the state
        setDepartments((prevDepartments) => [
          ...prevDepartments,
          response.data.result,
        ]);
        console.log("Department created successfully:", response.data.result);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error creating department:", err);
    }
  
    closeForm();
  };
  


  const deleteDepartment = async (id) => {
      if (window.confirm(" Bạn có chắc chắn là xóa phòng ban này không ?")) {
          try {
              // API call to delete the department
              const response = await axios.delete(`http://localhost:8080/api/departments/delete`, {
                  params: { id },
              });
  
              // Update state if the delete request was successful
              if (response.status === 200) {
                  setDepartments((prevDepartments) =>
                      prevDepartments.filter((dept) => dept.departmentId !== id)
                  );
                  alert("Phòng ban đã được xóa thành công");
              } else {
                  alert("Bị lỗi khi xóa phòng ban");
              }
          } catch (error) {
              console.error("Error deleting the department:", error);
              alert("An error occurred while deleting the department.");
          }
      }
  };
  

  return (
    <div className="departments-container">
      <h2 className="departments-title">Danh sách phòng ban</h2>
      <div className="departments-grid">
        {departments.map((department) => (
          <div
            key={department.departmentId}
            className={`department-card department-${department.departmentId}`}
          >
            <div className="department-card-header">
              <h3 className="department-name">{department.departmentName}</h3>
              <div className="department-actions">
                <FaEdit
                  className="action-icon edit-icon"
                  onClick={() => openForm(department)}
                />
                <FaTrashAlt
                  className="action-icon delete-icon"
                  onClick={() => deleteDepartment(department.departmentId)}
                />
              </div>
            </div>
            <div className="department-card-body">
              <p><strong>Mã phòng ban:</strong> {department.departmentId}</p>
              <p><strong>Số lượng nhân viên:</strong> {department.employeeNumber}</p>
              <p>
                <strong>Mã quản lý:</strong> {department.managerId ? department.managerId : "Chưa có"}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="create-department-button" onClick={openForm}>
        + Tạo phòng ban mới
      </button>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Tạo phòng ban mới</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label style={{ textAlign: "left", display: "block" }}>Tên phòng ban:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label style={{ textAlign: "left", display: "block" }}>Mã quản lý:</label>
                <input
                  type="text"
                  name="managerId"
                  value={formData.managerId}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-buttons">
                <button type="submit" className="submit-button">
                  Tạo mới
                </button>
                <button type="button" className="cancel-button" onClick={closeForm}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Department;
