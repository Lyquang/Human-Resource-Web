// src/components/DepartmentCard.jsx
import React from "react";
import { FaEdit, FaEnvelope, FaHeart, FaUsers } from "react-icons/fa";
import { MdDelete, } from "react-icons/md";
import DeleteDepartmentBtn from "./DeleteDepartmentBtn";
import "./DepartmentCard.css"; // Optional: external CSS for cleaner JSX
import DefaultAvatar from "../assets/defaut_pho.png"; // Default avatar icon

const DepartmentCard = ({ department }) => {

    // src/assets/dep1.jpg, dep2.jpg, dep3.jpg, ...
    const departmentImages = [
    require("../assets/dep_back_1.jpg"),
        require("../assets/dep_back_2.jpg"),
        require("../assets/dep_back_3.jpg"),
        require("../assets/dep_back_4.jpg"),
        require("../assets/dep_back_5.jpg"),
        require("../assets/dep_back_6.jpg"),
        require("../assets/dep_back_7.jpg"),
        require("../assets/dep_back_8.jpg"),
        require("../assets/dep_back_10.jpg"),
        require("../assets/dep_back_11.jpg"),
        require("../assets/dep_back_12.jpg"),
        require("../assets/dep_back_13.jpg"),
    ];
    
    const getRandomImage = () => {
        const index = Math.floor(Math.random() * departmentImages.length);
        return departmentImages[index];
        }; 
    
        const randomImage = getRandomImage(); // Get once per render



  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="department-card d-flex rounded shadow-lg overflow-hidden">
        {/* Left Image Area */}
        <div className="card-image" style={{
        backgroundImage: `url(${randomImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        maxHeight: '18rem',
        maxWidth: '10rem',
      }}>
          <div className="avatar-icon">
            <img src={DefaultAvatar} alt="Avatar" />
          </div>
        </div>

        {/* Right Info Area */}
        <div className="card-info px-3 py-3 bg-white flex-grow-1" style={{marginLeft: '10px'}}>

          <h5 className="fw-bold display-7">{department.departmentName}</h5>
          <p className="mb-2 display-7 fw-bold " style={{ fontSize: "16px" }}>
            {`Department ID: ${department.departmentId}`}<br />
            {`Manager ID: ${department.managerId || "Not Yet "}`}<br />
            {`Number of Employees: ${department.employeeNumber}`}<br />
            {`Establish Date: ${department.establishmentDate}`}<br />
            {`Manager: ${department.managerName || "Not Yet"}`}
          </p>

          {/* Action Icons */}
          <div className="d-flex justify-content-start gap-3 text-success" style={{ fontSize: "1.5rem" }}>
            {/* <FaUsers style={{ cursor: "pointer" }} />
            <FaEdit style={{ cursor: "pointer" }} /> */}

            <DeleteDepartmentBtn departmentId={department.departmentId} >
                <MdDelete style={{ cursor: "pointer", color:"red"}}  />
            </DeleteDepartmentBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
