import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { PiNotePencilDuotone } from "react-icons/pi";
import { FaProjectDiagram, FaRegUser, FaHome } from "react-icons/fa";
import { BiLogOut, BiChat } from "react-icons/bi";
import Defaut_Profile from "../components/assets/defaut_pho.png";
import { IoMdCloudUpload } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MainSideBar.css";

function MainSideBar({ accountId, token }) {
  const [expanded, setExpanded] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({
    personelCode: "",
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    position: "",
    profileImage: "",
    gender: "",
    taskList: [],
    tasksCompleteNumber: 0,
    projectList: [],
    projectsCompleteNumber: 0,
  });

  // const UserRole = {
  //   EMP: "EMP",
  //   MANA: "MANA",
  //   ADMIN: "ADMIN",
  // };
  const [empSidebar, setEmpSidebar] = useState(false);
  const [manaSidebar, setManaSidebar] = useState(false);
  const [adminSidebar, setAdminSidebar] = useState(false);

  useEffect(() => {
    const fetchPersonelData = async () => {
      try {
        const token = localStorage.getItem("token");
        const accountId = localStorage.getItem("accountId");

        if (!token || !accountId) {
          setError("Authentication token or account ID not found");
          setLoading(false);
          return;
        }

        const EmpResponse = await fetch(
          `http://localhost:8080/api/employee/account?id=${accountId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        // http://localhost:8080/api/managers/account?id=028b31fa-6ed0-42fb-8ae1-a4fd6f32ca21
        const ManaResponse = await fetch(
          `http://localhost:8080/api/managers/account?id=${accountId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        let MainResponse = EmpResponse;
        if (EmpResponse.ok) {
          console.log("accountId at emp infor >>>> ", accountId);
          MainResponse = EmpResponse;
          setEmpSidebar(true);
        } else if (ManaResponse.ok) {
          console.log("accountId at manager infor >>>> ", accountId);
          MainResponse = ManaResponse;
          setManaSidebar(true);
        } else {
          // MainResponse = Empresponse.ok ? Empresponse : ManaResponse;
          setAdminSidebar(true);
        }

        const data = await MainResponse.json();

        if (!MainResponse.ok) {
          throw new Error("Failed to fetch employee data");
        }

        localStorage.setItem("personelCode", data.personelCode);

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
          taskList: data.taskList || [],
          tasksCompleteNumber: data.tasksCompleteNumber || 0,
          projectList: data.projectList || [],
          projectsCompleteNumber: data.projectsCompleteNumber || 0,
        });

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPersonelData();
  }, []);

  return (
    <div
      className={`sidebar-main d-flex flex-column vh-100 shadow-sm`}
      style={{
        width: expanded ? "100%" : "50%",
      }}
    >
      {/* Header  */}
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
        <span className="font-weight-bold">{expanded && "BK-MANARATE"}</span>
        <button
          className="btn btn-sm btn-outline "
          style={{ fontSize: "1.5rem", color: "#3da9fc" }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ?  <FaArrowLeft />: <FaArrowRight />}
        </button>
      </div>

      {/* Avatar */}
      <div className="text-center py-3 border-bottom border-secondary">
        <img
          src={profile?.profileImage || Defaut_Profile}
          alt="Avatar"
          className="rounded-circle border"
          style={{ width: "3.5rem", height: "3.5rem", objectFit: "cover" }}
        />
        {expanded && (
          <div className="mt-2 small text-truncate justify-content-between align-items-center fw-bold">
            {profile?.lastName} {profile?.firstName}
          </div>
        )}
      </div>

      {empSidebar && (
        <div
          className="nav sidebar-main flex-column mt-3 px-2"
          style={{ fontSize: "1rem" }}
        >
          {[
            { to: "/login/employee", icon: <FaHome />, text: " Home" },
            { to: "infor", icon: <FaRegUser />, text: " My Information" },
            {
              to: "attendance",
              icon: <PiNotePencilDuotone />,
              text: " Check Attendance",
            },
            {
              to: "submittask",
              icon: <IoMdCloudUpload />,
              text: " Submit Task",
            },
            { to: "notification", icon: <BiChat />, text: " Notifications" },
            {
              to: "/",
              icon: <BiLogOut />,
              text: " Log Out",
            },
          ].map(({ to, icon, text }, idx) => (
            <NavLink
              key={idx}
              to={to}
              className="logout-btn nav-link d-flex align-items-center py-2 rounded px-2 my-1"
              activeClassName="active"
              style={{ transition: "background 0.3s" }}
            >
              <span className="mr-2" style={{ fontSize: "100%" }}>
                {icon}
              </span>
              {expanded && <span style={{ marginLeft: "10px" }}>{text}</span>}
            </NavLink>
          ))}
        </div>
      )}

      {manaSidebar && (
        <div
          className="nav sidebar-bg flex-column mt-3 px-2"
          style={{ fontSize: "1rem" }}
        >
          {[
            { to: "/", icon: <FaHome />, text: " Home" },
            { to: "infor", icon: <FaRegUser />, text: " My Information" },
            {
              to: "project",
              icon: <PiNotePencilDuotone />,
              text: "Projects",
            },
            {
              to: "notification",
              icon: <IoMdCloudUpload />,
              text: " Notifications",
            },
            {
              to: "/",
              icon: <BiLogOut />,
              text: " Log Out",
            },
          ].map(({ to, icon, text }, idx) => (
            <NavLink
              key={idx}
              to={to}
              exact
              className="nav-link d-flex align-items-center py-2 rounded px-2 my-1"
              activeClassName="active"
              style={{ transition: "background 0.3s" }}
            >
              <span
                className="mr-2"
                style={{ fontSize: "100%", color: "#094067" }}
              >
                {icon}
              </span>
              {expanded && (
                <span style={{ marginLeft: "10px", color: "#094067" }}>
                  {text}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      )}

      {adminSidebar && (
        <div
          className="nav sidebar-bg flex-column mt-3 px-2"
          style={{ fontSize: "1.1rem" }}
        >
          {[
            { to: "", icon: <FaHome />, text: " Home" },
            { to: "employee", icon: <FaRegUser />, text: "All Employees" },
            {
              to: "department",
              icon: <PiNotePencilDuotone />,
              text: "All Departments",
            },
            {
              to: "admin-attendance",
              icon: <IoMdCloudUpload />,
              text: " Check Attendance",
            },
            {
              to: "admin-salary",
              icon: <IoMdCloudUpload />,
              text: " Salary & Benefits",
            },
             {
              to: "/",
              icon: <BiLogOut />,
              text: " Log Out",
            },
          ].map(({ to, icon, text }, idx) => (
            <NavLink
              key={idx}
              to={to}
              exact
              className="nav-link d-flex align-items-center py-2 rounded px-2 my-1"
              activeClassName="active"
              style={{ transition: "background 0.3s" }}
            >
              <span className="mr-2" style={{ fontSize: "100%" }}>
                {icon}
              </span>
              {expanded && <span style={{ marginLeft: "10px" }}>{text}</span>}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default MainSideBar;
