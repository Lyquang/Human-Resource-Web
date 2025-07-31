import React, { useEffect, useState } from "react";
import { AddDepartmentBtn } from "./AddDepartmentBtn";
import DepartmentCard from "./DepartmentCard";
import axios from "../utils/axiosCustomize";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdAddHomeWork } from "react-icons/md";
import "../../index.css"
const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartmentsWithManagers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/departments/all"
        );
        if (response && response.data) {
          const rawDepartments = response.data.result;

          const departmentsWithManagerNames = await Promise.all(
            rawDepartments.map(async (dept) => {
              if (!dept.managerId) return { ...dept, managerName: null };

              try {
                const managerRes = await axios.get(
                  "http://localhost:8080/api/managers",
                  {
                    params: { code: dept.managerId },
                  }
                );

                const managerData = managerRes.data?.result;
                // console.log("manadata", managerData);
                const managerName = managerData
                  ? `${managerData.lastName} ${managerData.firstName}`
                  : "Không rõ";

                const managerAvatar = managerData.avatar ;
                // console.log("managerava",managerAvatar );

                return { ...dept, managerName, managerAvatar };
              } catch (error) {
                console.warn(
                  `Không lấy được tên cho managerId=${dept.managerId}`
                );
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
      <div className="row align-items-center mb-4">
        <div className="col">
          <h2 className="mb-0">All Departments</h2>
        </div>
        <div className="col-auto">
          <AddDepartmentBtn setDepartments={setDepartments}>
            <MdAddHomeWork style={{ fontSize: "1.5rem" }} />
          </AddDepartmentBtn>
        </div>
      </div>

      <div className="row">
        {departments.map((department) => (
          <DepartmentCard
            key={department.departmentId}
            department={department}
          />
        ))}
      </div>
    </div>
  );
};

export default DepartmentPage;
