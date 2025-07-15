import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AddDepartmentBtn } from "./AddDepartmentBtn";
import { DeleteDepartmentBtn } from "./DeleteDepartmentBtn";
import axios from "../utils/axiosCustomize";
import "bootstrap/dist/css/bootstrap.min.css";


const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const managerNameEach= useState(null);

useEffect(() => {
  const fetchDepartmentsWithManagers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/departments/all");
      if (response && response.data) {
        const rawDepartments = response.data.result;

        // Gọi song song các API lấy tên trưởng phòng
        const departmentsWithManagerNames = await Promise.all(
          rawDepartments.map(async (dept) => {
            if (!dept.managerId) return { ...dept, managerName: null };

            try {
              const managerRes = await axios.get(`http://localhost:8080/api/managers`, {
                params: { code: dept.managerId },
              });

              const managerData = managerRes.data?.result;
              const managerName = managerData ? `${managerData.lastName} ${managerData.firstName}` : "Không rõ";
              // console.log(`Tên trưởng phòng cho managerId=${dept.managerId}: ${managerName}`);
              return { ...dept, managerName };
            } catch (error) {
              console.warn(`Không lấy được tên cho managerId=${dept.managerId}`);
              return { ...dept, managerName: "Không xác định" };
            }
          })
        );

        setDepartments(departmentsWithManagerNames);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching departments:", err);
    }
  };

  fetchDepartmentsWithManagers();
}, []);






return (
    <div className="container py-4">
      <div className="row">
          <h2 className="text-center mb-4">All Departments</h2>
          <div>
            <AddDepartmentBtn setDepartments={setDepartments} />
          </div>
      </div>
    
      <div className="row">
        {departments.map((departmentsWithManagerNames) => (
          <div key={departmentsWithManagerNames.departmentId} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{departmentsWithManagerNames.departmentName}</h5>
                <div>
                  {/* <FaEdit
                    className="text-primary mr-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => openForm(departmentsWithManagerNames)}
                  /> */}
                </div>
              <DeleteDepartmentBtn
                departmentId={departmentsWithManagerNames.departmentId}
              />

              </div>
              <div className="card-body">
                <p><strong>Mã phòng ban:</strong> {departmentsWithManagerNames.departmentId}</p>
                <p><strong>Số lượng nhân viên:</strong> {departmentsWithManagerNames.employeeNumber}</p>
                <p><strong>Establishment Date :</strong> {departmentsWithManagerNames.establishmentDate}</p>
                <p><strong>Mã của Trưởng Phòng:</strong> {departmentsWithManagerNames.managerId || "Chưa có"}</p>
                <p><strong>Trường Phòng:</strong> {departmentsWithManagerNames.managerName|| "Chưa có"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Department;
