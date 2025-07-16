import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeCard from "./EmployeeCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { AddPersonel } from "./AddPersonel";
import { AssignEmployeeBtn } from "./AssignEmployeeBtn";
import { IoMdPersonAdd } from "react-icons/io";
import { MdAssignment } from "react-icons/md";

function AllEmployee() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/personnel/all"
        );
        console.log("API Response:", response.data);
        const data = response.data.result || [];
        setEmployees(data);
      } catch (err) {
        setError("Failed to fetch employees. Please try again later.");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSettingClick = (employee) => {
    console.log("employee gà vcccc:", employee.lastName, employee.firstName);
  };

  if (loading)
    return (
      <div className="text-center text-gray-600 text-lg py-10">Loading...</div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 text-lg py-10">{error}</div>
    );

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-100 min-h-screen">
      <style>
        {`
          .card {
            animation: fadeIn 0.5s ease-in-out;
            animation-delay: var(--animation-delay);
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      <div className="row align-items-center mb-4">
        <div className="col">
          <h2 className="mb-0">All Employees</h2>
        </div>
        <div className="col-auto">
          <AssignEmployeeBtn refresh={() => window.location.reload()} >
            <MdAssignment />
          </AssignEmployeeBtn>
        </div>
        <div className="col-auto">
          <AddPersonel>
              <IoMdPersonAdd />
          </AddPersonel>
        </div>
      </div>

      {employees.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No employees found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {employees.map((employee, index) => (
            <div
              className="col"
              key={employee.code || index}
              style={{ "--animation-delay": `${index * 0.2}s` }}
            >
              <EmployeeCard
                employee={employee}
                onSettingClick={() => handleSettingClick(employee)}
                index={index}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllEmployee;
