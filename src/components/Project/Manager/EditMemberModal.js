// import React, { useState } from 'react';
// import './EditMemberModal.scss';
// import axios from 'axios';

// const EditMemberModal = ({ members, onClose, employees, onSave, currentProjectId }) => {
//     const [newMemberId, setNewMemberId] = useState('');
//     const [currentMembers, setCurrentMembers] = useState(members);
//     const [message, setMessage] = useState('');

//     // const handleAddMember = () => {
//     //     const newMember = employees.find((emp) => emp.code === newMemberId);
//     //     // try (newMember)
//     //     // {
//     //     //     try {
//     //     //         const response = await axios.post()
//     //     //     }
//     //     // }
//     //     if (newMember) {
//     //         // Kiểm tra xem thành viên đã có trong danh sách chưa
//     //         if (currentMembers.some((member) => member.code === newMemberId)) {
//     //             setMessage('Member already exists.');
//     //             return;
//     //         }
//     //         else {
//     //             // Thêm thành viên và lọc lại để đảm bảo không có trùng lặp
//     //             setCurrentMembers((prevMembers) => {
//     //                 const updatedMembers = [...prevMembers, newMember];
//     //                 // Lọc lại để đảm bảo không có thành viên trùng lặp
//     //                 return updatedMembers.filter((value, index, self) =>
//     //                     index === self.findIndex((t) => (
//     //                         t.code === value.code
//     //                     ))
//     //                 );
//     //             });
//     //             setMessage('Member added successfully!');
//     //         }
//     //     } else {
//     //         setMessage('Member not found.');
//     //     }
//     //     setNewMemberId('');
//     // };

//     const handleAddMember = async () => {
//         const newMember = employees.find((emp) => emp.code === newMemberId);


//         if (newMember) {
//             // Kiểm tra xem thành viên đã có trong danh sách chưa
//             if (currentMembers.some((member) => member.code === newMemberId)) {
//                 setMessage('Member already exists.');
//                 return;
//             } else {
//                 try {
//                     // Gửi yêu cầu API để gán nhân viên vào dự án
//                     const response = await axios.post('http://localhost:8080/api/projects/assign', {
//                         employeeId: newMember.code, // ID nhân viên
//                         projectId: currentProjectId, // ID dự án hiện tại
//                     });

//                     if (response.data.code === 1000) {
//                         // Thành viên đã được thêm thành công
//                         setCurrentMembers((prevMembers) => {
//                             const updatedMembers = [...prevMembers, newMember];
//                             return updatedMembers.filter((value, index, self) =>
//                                 index === self.findIndex((t) => t.code === value.code)
//                             );
//                         });
//                         setMessage('Member added successfully!');
//                     } else {
//                         setMessage('Failed to add member: ' + response.data.message);
//                     }
//                 } catch (error) {
//                     console.error('Error adding member:', error);
//                     setMessage('Failed to add member.');
//                 }
//             }
//         } else {
//             setMessage('Member not found.');
//         }
//         setNewMemberId('');
//     };


//     const handleSave = () => {
//         // Gọi onSave với danh sách thành viên đã được lọc
//         onSave(currentMembers);
//     };

//     return (
//         <>
//             {/* Nền mờ khi modal hiển thị */}
//             <div className="overlay" onClick={onClose}></div>
//             <div className="member-modal">
//                 <div className="modal-content">
//                     <h3>Danh sách nhân viên</h3>
//                     <button className="close-btn btn-primary" onClick={onClose}>x</button>

//                     <ul className="member-list">
//                         {currentMembers.map((member, index) => (
//                             <li key={index} className="member-item">
//                                 <span className="member-code">{member.code}</span> - {member.name}
//                             </li>
//                         ))}
//                     </ul>

//                     <div className="add-member-section">
//                         <input
//                             type="text"
//                             value={newMemberId}
//                             onChange={(e) => setNewMemberId(e.target.value)}
//                             placeholder="Nhập ID của nhân viên"
//                             className="add-member-input"
//                         />
//                         <button onClick={handleAddMember} className="add-member-btn btn-primary">Thêm nhân viên</button>
//                     </div>
//                     {message && <p className="message">{message}</p>}

//                     <div className="modal-footer">
//                         <button onClick={handleSave} className="save-btn btn-primary">Lưu</button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default EditMemberModal; 
/*--------------------------------------------------------*/
import React, { useState, useEffect } from "react";
import "./EditMemberModal.scss";
import { getAllPersonel, getAllProjects } from "../../services/apiService";
import axios from "axios";

const EditMemberModal = ({ onClose, onSave, projectDetails }) => {
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);
    const [currentMembers, setCurrentMembers] = useState([]);
    const [message, setMessage] = useState("");
    const [newMemberId, setNewMemberId] = useState("");
    const [isLoading, setIsLoading] = useState(true); // Quản lý trạng thái loading

    const fetchProjects = async () => {
        try {
            const response = await getAllProjects();
            if (response && response.data.code === 1000) {
                setProjects(response.data.result);
            } else {
                setMessage("Failed to fetch projects: " + response.data.message);
            }
        } catch (err) {
            setMessage("Error fetching projects: " + err.message);
            console.error("Error fetching projects:", err);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/employee/all");
            if (response && response.data.code === 1000) {
                setEmployees(response.data.result);
            } else {
                setMessage("Failed to fetch employees: " + response.data.message);
            }
        } catch (err) {
            setMessage("Error fetching employees: " + err.message);
            console.error("Error fetching employees:", err);
        }
    };

    const handleAddMember = async () => {
        const newMember = employees.find((emp) => emp.personelCode === parseInt(newMemberId));

        if (newMember) {
            if (currentMembers.some((member) => member.personelCode === newMember.personelCode)) {
                setMessage("Member already exists.");
                return;
            } else {
                try {
                    const response = await axios.post("http://localhost:8080/api/projects/assign", {
                        employeeId: newMember.personelCode,
                        projectId: projectDetails.projectId,
                    });

                    if (response.data.code === 1000) {
                        setCurrentMembers((prevMembers) => {
                            const updatedMembers = [...prevMembers, newMember];
                            return updatedMembers.filter(
                                (value, index, self) =>
                                    index === self.findIndex((t) => t.personelCode === value.personelCode)
                            );
                        });
                        setMessage("Member added successfully!");
                    } else {
                        setMessage("Failed to add member: " + response.data.message);
                    }
                } catch (error) {
                    console.error("Error adding member:", error);
                    setMessage("Failed to add member.");
                }
            }
        } else {
            setMessage("Member not found.");
        }
        setNewMemberId("");
    };

    const handleRemoveMember = async (employeeId) => {
        try {
            const response = await axios.post("http://localhost:8080/api/projects/remove", {
                employeeId,
                projectId: projectDetails.projectId,
            });

            if (response.data.code === 1000) {
                setCurrentMembers((prevMembers) =>
                    prevMembers.filter((member) => member.personelCode !== employeeId)
                );
                setMessage("Xóa thành viên thành công!");

                if (projectDetails.participants > 0) {
                    projectDetails.participants -= 1;
                }
            } else {
                setMessage("Không thể xóa thành viên: " + response.data.message);
            }
        } catch (error) {
            console.error("Lỗi khi xóa thành viên:", error);
            setMessage("Không thể xóa thành viên.");
        }
    };

    const filterEmployeesByProject = () => {
        if (!projectDetails || !projectDetails.projectName) {
            setMessage("Project name not provided.");
            return;
        }

        const filteredEmployees = employees.filter((employee) =>
            employee.projectList.includes(projectDetails.projectName)
        );

        setCurrentMembers(filteredEmployees);

        if (filteredEmployees.length === 0) {
            setMessage("No employees found for this project.");
        } else {
            setMessage("");
        }
    };

    const handleSave = () => {
        onSave(currentMembers);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Bắt đầu loading
            await Promise.all([fetchEmployees(), fetchProjects()]);
            setIsLoading(false); // Kết thúc loading
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (employees.length > 0) {
            filterEmployeesByProject();
        }
    }, [employees, projectDetails]);

    return (
        <>
            <div className="overlay" onClick={onClose}></div>
            <div className="member-modal">
                <div className="modal-content">
                    {isLoading ? (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <>
                            <h5>Danh sách nhân viên trong dự án: {projectDetails?.projectName}</h5>
                            <button className="close-btn btn-primary" onClick={onClose}>
                                x
                            </button>

                            <ul className="member-list">
                                {currentMembers.length > 0 ? (
                                    currentMembers.map((member) => (
                                        <li
                                            key={member.personelCode}
                                            className="member-item d-flex justify-content-between align-items-center"
                                        >
                                            <div className="member-info">
                                                <span className="member-code">{member.personelCode}</span>{" "}
                                                - {member.firstName} {member.lastName} - {member.position}
                                            </div>
                                            <button
                                                className="remove-member-btn btn-danger ms-3"
                                                onClick={() => handleRemoveMember(member.personelCode)}
                                            >
                                                Xóa
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <p>Không có nhân viên nào trong dự án này.</p>
                                )}
                            </ul>

                            <div className="add-member-section">
                                <input
                                    type="text"
                                    value={newMemberId}
                                    onChange={(e) => setNewMemberId(e.target.value)}
                                    placeholder="Nhập ID của nhân viên"
                                    className="add-member-input"
                                />
                                <button onClick={handleAddMember} className="add-member-btn btn-primary">
                                    Thêm nhân viên
                                </button>
                            </div>

                            {message && <p className="message">{message}</p>}
                            <div className="modal-footer">
                                <button onClick={handleSave} className="save-btn btn-primary">
                                    Lưu
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default EditMemberModal;
