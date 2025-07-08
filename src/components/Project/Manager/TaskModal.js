// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './TaskModal.scss';

// const TaskModal = ({ project, employees, onClose }) => {
//     const [tasks, setTasks] = useState(() => {
//         const savedTasks = localStorage.getItem('tasks');
//         return savedTasks ? JSON.parse(savedTasks) : [...project.tasks];
//     });

//     const [editingIndex, setEditingIndex] = useState(null);
//     const [showAddTaskModal, setShowAddTaskModal] = useState(false);
//     const [newTask, setNewTask] = useState({
//         taskname: '',
//         employee_codes: [''], // Ensure employee_codes is an array
//         description: '',
//         deadline: '',
//         status: 'not_started',
//     });

//     useEffect(() => {
//         localStorage.setItem('tasks', JSON.stringify(tasks));
//     }, [tasks]);

//     const handleInputChange = (index, field, value) => {
//         const updatedTasks = [...tasks];
//         updatedTasks[index][field] = value;
//         setTasks(updatedTasks);
//     };

//     const toggleEditMode = (index) => {
//         setEditingIndex((prev) => (prev === index ? null : index));
//     };

//     const getAvatarUrl = (index) => `https://randomuser.me/api/portraits/men/${index % 100}.jpg`;

//     const handleAddTask = () => {
//         setTasks([...tasks, newTask]);
//         setShowAddTaskModal(false);
//         setNewTask({
//             taskname: '',
//             employee_codes: [''], // Reset employee selection
//             description: '',
//             deadline: '',
//             status: 'not_started',
//         });
//     };

//     const handleNewTaskInputChange = (field, value) => {
//         setNewTask((prev) => ({
//             ...prev,
//             [field]: value,
//         }));
//     };

//     const handleSaveTasks = () => {
//         localStorage.setItem('tasks', JSON.stringify(tasks));
//         alert('Tasks have been saved.');
//         onClose();
//     };

//     const handleDeleteTask = (index) => {
//         const updatedTasks = tasks.filter((_, i) => i !== index);
//         setTasks(updatedTasks);
//     };

//     return (
//         <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
//             <div className="modal-dialog modal-lg task-modal">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title">Nhiệm vụ cho dự án: {project.name}</h5>
//                         <button type="button" className="btn-close btn-primary" aria-label="Close" onClick={onClose}></button>
//                     </div>
//                     <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                         <div className="task-list">
//                             {tasks.length > 0 ? (
//                                 tasks.map((task, index) => (
//                                     <div key={index} className="task-item border rounded p-3 mb-3 d-flex flex-column position-relative">
//                                         <div className="d-flex position-absolute top-0 end-0 m-2 gap-2">
//                                             <button className="btn btn-sm btn-primary btn-outline-danger small-btn d-flex align-items-center justify-content-center" onClick={() => handleDeleteTask(index)}>
//                                                 Xóa
//                                             </button>
//                                             <button className="btn btn-sm btn-primary btn-outline-primary small-btn d-flex align-items-center justify-content-center" onClick={() => toggleEditMode(index)}>
//                                                 {editingIndex === index ? 'Xong' : 'Chỉnh sửa'}
//                                             </button>
//                                         </div>
//                                         <div className="d-flex align-items-center mb-2">
//                                             <div className="me-3 text-center">
//                                                 <img src={getAvatarUrl(index)} alt={`Avatar ${task.employee_codes[0]}`} className="rounded-circle" width="50" height="50" />
//                                             </div>
//                                             <div className="d-flex flex-grow-1 gap-3 align-items-center">
//                                                 <div className="w-50">
//                                                     <label className="form-label">Nhân viên</label>
//                                                     {editingIndex === index ? (
//                                                         <select className="form-select" style={{ height: '38px' }} value={task.employee_codes[0]} onChange={(e) => handleInputChange(index, 'employee_codes', [e.target.value])}>
//                                                             {employees.map((employee) => (
//                                                                 <option key={employee.code} value={employee.code}>
//                                                                     {employee.name} ({employee.code})
//                                                                 </option>
//                                                             ))}
//                                                         </select>
//                                                     ) : (
//                                                         <p className="form-control bg-light" style={{ height: '38px', display: 'flex', alignItems: 'center', margin: 0 }}>
//                                                             {task.employee_codes[0]}
//                                                         </p>
//                                                     )}
//                                                 </div>
//                                                 <div className="w-50">
//                                                     <label className="form-label">Tên task</label>
//                                                     {editingIndex === index ? (
//                                                         <input
//                                                             type="text"
//                                                             className="form-control"
//                                                             style={{ height: '38px' }}
//                                                             value={task.taskname}
//                                                             onChange={(e) => handleInputChange(index, 'taskname', e.target.value)}
//                                                             placeholder="Task Name"
//                                                         />
//                                                     ) : (
//                                                         <div className="form-control bg-light" style={{ height: '38px', display: 'flex', alignItems: 'center' }}>
//                                                             {task.taskname}
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="d-flex justify-content-between align-items-center">
//                                             <div className="me-2 flex-grow-1">
//                                                 <label className="form-label">Mô tả</label>
//                                                 {editingIndex === index ? (
//                                                     <input type="text" className="form-control" value={task.description} onChange={(e) => handleInputChange(index, 'description', e.target.value)} placeholder="Description" />
//                                                 ) : (
//                                                     <div className="form-control bg-light">{task.description}</div>
//                                                 )}
//                                             </div>
//                                             <div className="me-2">
//                                                 <label className="form-label">Hạn nộp</label>
//                                                 {editingIndex === index ? (
//                                                     <input type="date" className="form-control" value={task.deadline} onChange={(e) => handleInputChange(index, 'deadline', e.target.value)} />
//                                                 ) : (
//                                                     <div className="form-control bg-light">{task.deadline || 'N/A'}</div>
//                                                 )}
//                                             </div>
//                                             <div>
//                                                 <label className="form-label">Trạng thái</label>
//                                                 {editingIndex === index ? (
//                                                     <select className="form-select" value={task.status || 'not_started'} onChange={(e) => handleInputChange(index, 'status', e.target.value)}>
//                                                         <option value="completed">Đã hoàn thành</option>
//                                                         <option value="in_progress">Qúa hạn</option>
//                                                         <option value="not_started">Hủy</option>
//                                                     </select>
//                                                 ) : (
//                                                     <div className="form-control bg-light">
//                                                         {task.status === 'completed' ? 'Đã hoàn thành' : task.status === 'in_progress' ? 'Qúa hạn' : 'Hủy'}
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p>No tasks available for this project.</p>
//                             )}
//                         </div>
//                         <button className="btn btn-primary btn-success mt-3" onClick={() => setShowAddTaskModal(true)}>
//                             Thêm Task
//                         </button>
//                         {showAddTaskModal && (
//                             <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
//                                 <div className="modal-dialog modal-lg">
//                                     <div className="modal-content">
//                                         <div className="modal-header">
//                                             <h5 className="modal-title">Thêm Task Mới</h5>
//                                             <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAddTaskModal(false)}></button>
//                                         </div>
//                                         <div className="modal-body">
//                                             <div>
//                                                 <label className="form-label">Nhân viên</label>
//                                                 <select className="form-select" value={newTask.employee_codes[0]} onChange={(e) => handleNewTaskInputChange('employee_codes', [e.target.value])}>
//                                                     <option value="">Chọn nhân viên</option>
//                                                     {employees.map((employee) => (
//                                                         <option key={employee.id} value={employee.code}>
//                                                             {employee.name}
//                                                         </option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                             <div>
//                                                 <label className="form-label">Tên Task</label>
//                                                 <input type="text" className="form-control" value={newTask.taskname} onChange={(e) => handleNewTaskInputChange('taskname', e.target.value)} placeholder="Tên Task" />
//                                             </div>
//                                             <div>
//                                                 <label className="form-label">Mô tả</label>
//                                                 <input type="text" className="form-control" value={newTask.description} onChange={(e) => handleNewTaskInputChange('description', e.target.value)} placeholder="Mô tả" />
//                                             </div>
//                                             <div>
//                                                 <label className="form-label">Hạn Nộp</label>
//                                                 <input type="date" className="form-control" value={newTask.deadline} onChange={(e) => handleNewTaskInputChange('deadline', e.target.value)} />
//                                             </div>
//                                             <div>
//                                                 <label className="form-label">Trạng thái</label>
//                                                 <select className="form-select" value={newTask.status} onChange={(e) => handleNewTaskInputChange('status', e.target.value)}>
//                                                     <option value="not_started">Chưa bắt đầu</option>
//                                                     <option value="in_progress">Đang làm</option>
//                                                     <option value="completed">Hoàn thành</option>
//                                                 </select>
//                                             </div>
//                                         </div>
//                                         <div className="modal-footer">
//                                             {/* <button type="button" className="btn btn-secondary" onClick={() => setShowAddTaskModal(false)}>
//                                                 Đóng
//                                             </button>
//                                            */}
//                                             <button type="button" className="btn btn-primary" onClick={handleAddTask}>
//                                                 Thêm
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                     <div className="modal-footer">
//                         {/* <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
//                          */}
//                         <button type="button" className="btn btn-primary" onClick={handleSaveTasks}>Lưu</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
/*-----------------------------------------------------------------------------------------------*/
// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './TaskModal.scss';
// import axios from 'axios';

// const TaskModal = ({ projectId, onClose }) => {
//     const [tasks, setTasks] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchTasksByProjectId = async () => {
//             try {
//                 setLoading(true); // Hiển thị trạng thái đang tải
//                 const response = await axios.get(`http://localhost:8080/api/tasks/project?id=${projectId}`);
//                 if (response.data.code === 1000) {
//                     setTasks(response.data.result || []);
//                 } else {
//                     console.error('Error fetching tasks:', response.data.message);
//                 }
//             } catch (error) {
//                 console.error('Error fetching tasks:', error);
//             } finally {
//                 setLoading(false); // Tắt trạng thái đang tải
//             }
//         };

//         if (projectId) {
//             fetchTasksByProjectId();
//         }
//     }, [projectId]);

//     const formatDate = (date) => {
//         return new Date(date).toLocaleDateString('vi-VN');
//     };

//     return (
//         <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
//             <div className="modal-dialog modal-lg task-modal">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title">Danh sách nhiệm vụ</h5>
//                         <button
//                             type="button"
//                             className="btn-close"
//                             aria-label="Close"
//                             onClick={onClose}
//                         ></button>
//                     </div>
//                     <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                         {loading ? (
//                             <p>Đang tải nhiệm vụ...</p>
//                         ) : tasks.length > 0 ? (
//                             <div className="task-list">
//                                 {tasks.map((task, index) => (
//                                     <div
//                                         key={index}
//                                         className="task-item border rounded p-3 mb-3 d-flex flex-column"
//                                     >
//                                         {/* Hiển thị projectName */}
//                                         <div className="mb-2">
//                                             <strong>Dự án:</strong> {task.projectName || 'Không rõ'}
//                                         </div>

//                                         <div className="d-flex justify-content-between align-items-center mb-2">
//                                             <h6 className="mb-0">Tên Task: {task.title}</h6>
//                                             <span className={`badge ${task.status === 'COMPLETED' ? 'bg-success' : task.status === 'IN_PROGRESS' ? 'bg-warning' : 'bg-danger'}`}>
//                                                 {task.status === 'COMPLETED'
//                                                     ? 'Hoàn thành'
//                                                     : task.status === 'IN_PROGRESS'
//                                                         ? 'Đang thực hiện'
//                                                         : 'Chưa bắt đầu'}
//                                             </span>
//                                         </div>

//                                         <div className="row mb-2">
//                                             <div className="col-md-6">
//                                                 <strong>Mô tả:</strong>
//                                                 <p className="mb-1">{task.description || 'Không có mô tả'}</p>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <strong>Nhân viên thực hiện:</strong>
//                                                 <p className="mb-1">{task.employeeName || 'Chưa phân công'}</p>
//                                             </div>
//                                         </div>

//                                         <div className="row">
//                                             <div className="col-md-6">
//                                                 <strong>Hạn nộp:</strong>
//                                                 <p className="mb-1">{formatDate(task.due)}</p>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <strong>File đính kèm:</strong>
//                                                 {task.fileName ? (
//                                                     <a
//                                                         href={task.fileUrl}
//                                                         target="_blank"
//                                                         rel="noopener noreferrer"
//                                                         className="text-decoration-none text-primary"
//                                                     >
//                                                         {task.fileName}
//                                                     </a>
//                                                 ) : (
//                                                     <p className="mb-1">Không có</p>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : (
//                             <p>Không có nhiệm vụ nào cho dự án này.</p>
//                         )}
//                     </div>
//                     <div className="modal-footer">
//                         <button type="button" className="btn btn-secondary" onClick={onClose}>
//                             Đóng
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TaskModal;
/*------------------------------------------------------------------------------- */

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TaskModal.scss";
import axios from "axios";

const TaskModal = ({ projectId, onClose }) => {
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingIndex, setEditingIndex] = useState(null);
    const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        deadline: "",
        employeeId: "",
    });

    useEffect(() => {
        const fetchTasksByProjectId = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:8080/api/tasks/project?id=${projectId}`
                );
                if (response.data.code === 1000) {
                    setTasks(response.data.result || []);
                } else {
                    console.error("Error fetching tasks:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/projects/employees?code=${projectId}`);
                if (response.data.code === 1000 && Array.isArray(response.data.result)) {
                    setEmployees(response.data.result);
                } else {
                    console.error("API did not return a valid result:", response.data);
                    setEmployees([]);
                }
            } catch (error) {
                console.error("Error fetching employees:", error);
                setEmployees([]);
            }
        };

        if (projectId) {
            fetchTasksByProjectId();
            fetchEmployees();
        }
    }, [projectId]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("vi-VN");
    };

    const toggleEditMode = (index) => {
        if (editingIndex === index) {
            const task = tasks[index];
            updateStatus(task.tasksId, task.status);
        }
        setEditingIndex(editingIndex === index ? null : index);
    };

    const handleInputChange = (index, field, value) => {
        const updatedTasks = [...tasks];
        updatedTasks[index][field] = value;
        setTasks(updatedTasks);
    };

    const updateStatus = async (taskId, status) => {
        try {
            const url = `http://localhost:8080/api/tasks/status-update?id=${taskId}&status=${status}`;
            const response = await axios.patch(url); // Sử dụng PATCH để cập nhật trạng thái trên server
            if (response.data.code === 1000) {
                alert("Cập nhật trạng thái thành công!");
            } else {
                console.error("Lỗi khi cập nhật trạng thái:", response.data.message);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            alert("Có lỗi xảy ra khi cập nhật trạng thái.");
        }
    };

    const assignEmployee = async (taskId, employeeId) => {
        try {
            const url = `http://localhost:8080/api/tasks/assign?taskId=${taskId}&employeeId=${employeeId}`;
            const response = await axios.patch(url);
            alert("Gán nhân viên thành công!");
        } catch (error) {
            console.error("Error assigning employee:", error);
            alert("Có lỗi xảy ra khi gán nhân viên.");
        }
    };

    const deleteTask = async (taskId, index) => {
        try {
            const url = `http://localhost:8080/api/tasks/${taskId}`; // URL API xóa task
            const response = await axios.delete(url); // Gọi API DELETE
            if (response.status === 200 && response.data.code === 1000) { // Kiểm tra phản hồi từ server
                const updatedTasks = tasks.filter((_, i) => i !== index); // Cập nhật danh sách task sau khi xóa
                setTasks(updatedTasks); // Gán danh sách mới vào state
                alert("Xóa nhiệm vụ thành công!"); // Thông báo thành công
            } else {
                alert(`Xóa nhiệm vụ thất bại: ${response.data.message || "Lỗi không xác định"}`);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Có lỗi xảy ra khi xóa nhiệm vụ.");
        }
    };

    const handleCreateTask = async () => {
        if (!newTask.title || !newTask.description || !newTask.deadline || !newTask.employeeId) {
            alert("Vui lòng nhập đầy đủ thông tin nhiệm vụ.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/tasks/create", {
                title: newTask.title,
                description: newTask.description,
                deadline: newTask.deadline,
                status: "IN_PROGRESS",
                projectId,
                employeeId: newTask.employeeId,
            });

            if (response.data.code === 1000) {
                setTasks((prev) => [...prev, response.data.result]);
                setShowCreateTaskForm(false);
                setNewTask({ title: "", description: "", deadline: "", employeeId: "" });
                alert("Nhiệm vụ đã được tạo thành công!");
            } else {
                console.error("Error creating task:", response.data.message);
            }
        } catch (error) {
            console.error("Error creating task:", error);
            alert("Có lỗi xảy ra khi tạo nhiệm vụ.");
        }
    };

    return (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
            <div className="modal-dialog modal-lg task-modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Danh sách nhiệm vụ</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body" style={{ maxHeight: "400px", overflowY: "auto" }}>
                        {loading ? (
                            <p>Đang tải nhiệm vụ...</p>
                        ) : tasks.length > 0 ? (
                            <div className="task-list">
                                {tasks.map((task, index) => (
                                    <div
                                        key={task.tasksId}
                                        className="task-item border rounded p-3 mb-3 d-flex flex-column position-relative"
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h6 className="mb-0">Tên Task: {task.title}</h6>
                                            <div>
                                                <button
                                                    className="btn btn-sm btn-warning me-2"
                                                    onClick={() => toggleEditMode(index)}
                                                >
                                                    {editingIndex === index ? "Lưu" : "Chỉnh sửa"}
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => deleteTask(task.tasksId, index)}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>

                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <strong>Mô tả:</strong>
                                                <p>{task.description || "Chưa có mô tả"}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <strong>Hạn chót:</strong>
                                                <p>{formatDate(task.due) || "Chưa có hạn chót"}</p>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <strong>Trạng thái:</strong>
                                                {editingIndex === index ? (
                                                    <select
                                                        className="form-select"
                                                        value={task.status}
                                                        onChange={(e) => {
                                                            const newStatus = e.target.value;
                                                            handleInputChange(index, "status", newStatus);
                                                        }}
                                                    >

                                                        <option value="COMPLETED">Hoàn thành</option>
                                                        <option value="IN_PROGRESS">Đang thực hiện</option>
                                                    </select>
                                                ) : (
                                                    <p>{task.status || "Chưa có trạng thái"}</p>
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                <strong>Dự án:</strong>
                                                <p>{task.projectName || "Chưa có tên dự án"}</p>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <strong>Nhân viên thực hiện:</strong>
                                                {editingIndex === index ? (
                                                    <select
                                                        className="form-select"
                                                        value={task.employeeId || ""}
                                                        onChange={(e) => {
                                                            const selectedEmployeeId = e.target.value;
                                                            assignEmployee(task.tasksId, selectedEmployeeId);
                                                        }}
                                                    >
                                                        <option value="">Chọn nhân viên</option>
                                                        {employees.map((employee) => (
                                                            <option
                                                                key={employee.employeeId}
                                                                value={employee.employeeId}
                                                            >
                                                                {employee.firstName} {employee.lastName}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <p>{task.employeeName || "Chưa phân công"}</p>
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                <strong>File đính kèm:</strong>
                                                {task.fileName ? (
                                                    <a
                                                        href={task.fileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-decoration-none text-primary"
                                                    >
                                                        {task.fileName}
                                                    </a>
                                                ) : (
                                                    <p>Chưa có</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Không có nhiệm vụ nào cho dự án này.</p>
                        )}
                        {showCreateTaskForm && (
                            <div className="create-task-form border rounded p-3 mt-3">
                                <h5>Tạo nhiệm vụ mới</h5>
                                <div className="mb-3">
                                    <label className="form-label">Tên nhiệm vụ</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newTask.title}
                                        onChange={(e) =>
                                            setNewTask((prev) => ({ ...prev, title: e.target.value }))
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mô tả</label>
                                    <textarea
                                        className="form-control"
                                        value={newTask.description}
                                        onChange={(e) =>
                                            setNewTask((prev) => ({ ...prev, description: e.target.value }))
                                        }
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Hạn chót</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={newTask.deadline}
                                        onChange={(e) =>
                                            setNewTask((prev) => ({ ...prev, deadline: e.target.value }))
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nhân viên thực hiện</label>
                                    <select
                                        className="form-select"
                                        value={newTask.employeeId}
                                        onChange={(e) =>
                                            setNewTask((prev) => ({ ...prev, employeeId: e.target.value }))
                                        }
                                    >
                                        <option value="">Chọn nhân viên</option>
                                        {employees.map((employee) => (
                                            <option
                                                key={employee.employeeId}
                                                value={employee.employeeId}
                                            >
                                                {employee.firstName} {employee.lastName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    className="btn btn-success"
                                    onClick={handleCreateTask}
                                >
                                    Tạo nhiệm vụ
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowCreateTaskForm(!showCreateTaskForm)}
                        >
                            {showCreateTaskForm ? "Hủy" : "Tạo nhiệm vụ mới"}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;







