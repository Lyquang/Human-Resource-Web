import React from "react";
import { Trash, User } from "react-feather";
import "bootstrap/dist/css/bootstrap.min.css";
import { Settings2Icon } from "lucide-react";
import DefaultPhoto from "../assets/default_ava2.webp"; // Adjust the path as necessary
import "../../index.css"

const getRoleColor = (role) => (role === "EMPLOYEE" ? "#0004fc" : "#fc0000");



const EmployeeCard = ({ employee, index, onSettingClick }) => {
    return (
        <div className="col" style={{ animationDelay: `${index * 0.2}s` }}>
            <div className="profile-card card ">
                <div className='row no-gutters employee-list-row'>
                    {/* HEADER */}
                    <div className='col-3 d-flex flex-column align-items-center' >
                        <div className="d-flex flex-column align-items-center flex-grow-2">
                            <img src={employee.avatar || DefaultPhoto } className='card-img rounded-circle mt-4' alt='Avatar' />
                        </div>
                    </div>

                    {/* BODY */}
                    <div className='col-9'>
                        <div className='card-body d-flex flex-column' >

                            {/* Phần tên chiếm 1/5 */}
                            <div className='d-flex align-items-center justify-content-between'>
                                <h5 className='card-title mb-0'>
                                    {employee.lastName} {employee.firstName}
                                </h5>
                                <button className='btn btn-primary' onClick={onSettingClick}>
                                    <Settings2Icon size={16} className="me-1" />
                                </button>
                            </div>

                            {/* Phần chức vụ chiếm 1/5, chỉ tô màu nền trong phạm vi chữ */}
                            <div className='d-flex align-items-center ' style={{ flex: '1' }}>
                                
                                {/* Position tag */}
                                <h6 className='card-subtitle mb-0 custom-ml'>
                                    <span
                                        style={{
                                            backgroundColor: getRoleColor(employee.position),
                                            color: 'white',
                                            borderRadius: '4px',
                                            padding: '2px 8px',
                                        }}
                                      >
                                        {employee.position}
                                    </span>
                                </h6>
                                {/* Code tag */}
                                
                                <h6 className='card-subtitle mb-0 custom-ml'>
                                    <span
                                        style={{
                                            marginLeft:"15px",
                                            backgroundColor: "#3c88da",
                                            color: 'white',
                                            borderRadius: '4px',
                                            padding: '2px 8px',
                                        }}
                                    >
                                        {employee.code}
                                    </span>
                                </h6>

                                {/* Department tag */}
                                <h6 className='card-subtitle mb-0 custom-ml'>
                                    <span
                                        style={{
                                            marginLeft:"15px",
                                            backgroundColor: "green",
                                            color: 'white',
                                            borderRadius: '4px',
                                            padding: '2px 8px',
                                        }}
                                    >
                                        {employee.departmentName || "Not found"}
                                    </span>
                                </h6>
                            </div>

                            {/* Phần mô tả công việc chiếm 2/5 */}
                            <div className='d-flex' style={{ flex: '2' }}>
                                <p className='card-text'>{employee.job}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCard;
