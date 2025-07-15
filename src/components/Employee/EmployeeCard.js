import React from "react";
import { Trash, User } from "react-feather";
import "bootstrap/dist/css/bootstrap.min.css";
import { Settings2Icon } from "lucide-react";
import DefaultPhoto from "../assets/defaut_pho.png"; // Adjust the path as necessary

const getRoleColor = (role) => (role === "EMPLOYEE" ? "#0004fc" : "#fc0000");



const EmployeeCard = ({ employee, index, onSettingClick }) => {
    return (
        <div className="col" style={{ animationDelay: `${index * 0.2}s` }}>
            <div className="card">
                <div className='row no-gutters employee-list-row'>
                    {/* HEADER */}
                    <div className='col-3 d-flex flex-column align-items-center' style={{ height: '100%' }}>
                        {/* Phần Avatar chiếm 2/3 */}
                        <div className="d-flex flex-column align-items-center flex-grow-2">
                            <img src={employee.avatar || DefaultPhoto } className='card-img rounded-circle mt-3' alt='Avatar'
                                style={{
                                    objectFit: 'cover',
                                    height: '70px',
                                    width: '70px',
                                    boxShadow : '0 4px 8px rgba(0, 0, 0, 0.2)',
                                }}
                            />
                        </div>
                        
                    </div>

                    {/* BODY */}
                    <div className='col-9'>
                        <div className='card-body d-flex flex-column' style={{ height: '100%' }}>

                            {/* Phần tên chiếm 1/5 */}
                            <div className='d-flex align-items-center justify-content-between' style={{ flex: '1' }}>
                                <h5 className='card-title mb-0'>
                                    {employee.lastName} {employee.firstName}
                                </h5>
                                <button className='btn btn-primary' onClick={onSettingClick}>
                                    <Settings2Icon size={16} className="me-1" />
                                </button>
                            </div>

                            {/* Phần chức vụ chiếm 1/5, chỉ tô màu nền trong phạm vi chữ */}
                            <div className='d-flex align-items-center mt-2' style={{ flex: '1' }}>
                                
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
