


import React, { useState, useEffect } from 'react';
import './ManagerProject.scss';
import TaskModal from './TaskModal';
import MemberModal from './EditMemberModal';
import EditProject from './EditProject';
import axios from 'axios'; // Import axios for making API requests

const ManagerProject = () => {
    const [projects, setProjects] = useState([]);
    const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
    // const [currentMembers, setCurrentMembers] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
    const [currentProjectId, setCurrentProjectId] = useState(null);
    // const [message, setMessage] = useState('');
    const [currentProjectDetails, setCurrentProjectDetails] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Trạng thái loading



    // useEffect(() => {
    //     const fetchProjectsAndTasks = async () => {
    //         try {
    //             // Fetch projects
    //             const projectResponse = await axios.get('http://localhost:8080/api/projects/all');
    //             const taskResponse = await axios.get('http://localhost:8080/api/tasks/all');

    //             if (projectResponse.data.code === 1000 && taskResponse.data.code === 1000) {
    //                 setProjects(projectResponse.data.result || []);
    //                 setTasks(taskResponse.data.result || []);
    //             } else {
    //                 console.error('Error fetching data:', projectResponse.data.message, taskResponse.data.message);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchProjectsAndTasks();
    // }, []);



    useEffect(() => {
        const fetchProjectsAndTasks = async () => {
            setIsLoading(true); // Bắt đầu loading

            try {
                const [projectResponse, taskResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/projects/all'),
                    axios.get('http://localhost:8080/api/tasks/all'),
                ]);
                // const projectResponse = await axios.get('http://localhost:8080/api/projects/all');
                // const taskResponse = await axios.get('http://localhost:8080/api/tasks/all');
                // console.log('project data', projectResponse.data)
                // console.log('task data', taskResponse.data)


                if (projectResponse.data.code === 1000) {
                    const fetchedProjects = projectResponse.data.result.map((project) => ({
                        id: project.projectId,
                        name: project.projectName,
                        company: project.departmentName,
                        attachments: project.attachments || 0,
                        members: project.participants || 0,
                        project_description: project.projectDescription,
                        duration: project.duration || "N/A",
                        comments: project.comments || 0,
                        daysLeft: project.daysLeft || 0,
                        progress: project.progress || 0,
                        icon: project.icon || "default-icon",
                        tasks: project.numberOfTasks || 0,
                    }));
                    setProjects(fetchedProjects);
                } else {
                    console.error('Error fetching projects:', projectResponse.data.message);
                }

                if (taskResponse.data.code === 1000) {
                    setTasks(taskResponse.data.result || []);
                } else {
                    console.error('Error fetching tasks:', taskResponse.data.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchProjectsAndTasks();
    }, []);




    const fetchProjectDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/projects?id=${id}`);
            if (response.data && response.data.code === 1000) {
                setCurrentProjectDetails(response.data.result);
                setCurrentProjectId(id);
            } else {
                console.error('Error fetching project details:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching project details:', error);
        }
    };


    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Đang tải dữ liệu, vui lòng chờ...</p>
            </div>
        );
    }



    const handleCreateProjectClick = () => {
        setIsCreateProjectModalOpen(true);
    };

    const closeCreateProjectModal = () => {
        setIsCreateProjectModalOpen(false);
    };

    const handleDeleteProject = (projectId) => {
        setProjects((prevProjects) => prevProjects.filter(project => project.id !== projectId));
    };

    const handleMemberClick = (project) => {
        if (project?.id) {
            fetchProjectDetails(project.id); // Lấy thông tin dự án qua API
        }
        setIsMemberModalOpen(true); // Mở modal
    };

    const handleProjectClick = (project) => {
        if (project?.id) {
            fetchProjectDetails(project.id); // Lấy thông tin dự án qua API
        }
        setSelectedProject(true); // Mở modal
    };




    const handleSaveMembers = async (updatedMembers, participants) => {
        // try {
        //     // Gửi yêu cầu API để gán nhân viên vào dự án
        //     const projectId = currentProjectId; // Dự án hiện tại

        //     // Gửi từng nhân viên vào dự án
        //     for (let member of updatedMembers) {
        //         const response = await axios.post('http://localhost:8080/api/projects/assign', {
        //             employeeId: member.code, // ID nhân viên
        //             projectId: projectId, // ID dự án
        //         });

        //         if (response.data.code === 1000) {
        //             console.log(`Employee ${member.name} added to project.`);
        //         } else {
        //             console.error(`Failed to add employee ${member.name}: ${response.data.message}`);
        //         }
        //     }

        //     // Cập nhật lại danh sách dự án sau khi gán thành viên thành công
        //     setProjects((prevProjects) =>
        //         prevProjects.map((project) => {
        //             if (project.id === currentProjectId) {
        //                 const newEmployeeCodes = updatedMembers.map((member) => member.code);
        //                 const updatedTasks = project.tasks.map((task) => ({
        //                     ...task,
        //                     employee_codes: [...new Set([...task.employee_codes, ...newEmployeeCodes])],
        //                 }));
        //                 return { ...project, tasks: updatedTasks };
        //             }
        //             return project;
        //         })
        //     );

        //     setIsMemberModalOpen(false);
        // } catch (error) {
        //     console.error('Error adding members to project:', error);
        //     setMessage('Error adding members to project.');
        // }
        // setIsMemberModalOpen(false)
        setProjects((prevProjects) =>
            prevProjects.map((project) => {
                if (project.id === currentProjectId) {
                    return { ...project, participants };
                }
                return project;
            })
        );
        setIsMemberModalOpen(false);

    };







    const employees = [
        { code: 'E001', name: 'Nguyen Van A' },
        { code: 'E002', name: 'Nguyen Van T' },
        { code: 'E003', name: 'Le Van C' },
        { code: 'E004', name: 'Vo Le' }
    ];

    return (
        <div className="manager-projects">
            <div className="header d-flex align-items-center justify-content-between">
                <h2>Quản lý dự án</h2>
                <div className="action-buttons">
                    <button onClick={handleCreateProjectClick} className="btn btn-primary">
                        Tạo project
                    </button>
                </div>
            </div>
            <hr />

            <div className="row g-3 gy-5 py-3 row-deck">
                {projects.map((project, index) => (
                    <div key={index} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <div className="card">
                            <div className="card-header">
                                {/* <img src={`/path/to/icons/${project.icon}.png`} alt={`${project.name} icon`} className="project-icon" /> */}
                                <p className="company-name">{project.name}</p>
                            </div>
                            <button className="btn-delete" onClick={() => handleDeleteProject(project.id)}>
                                &#10005;
                            </button>
                            <div className="card-body">
                                <div className="avatars">
                                    {Array(project.members).fill('').map((_, i) => (
                                        <img key={i} src="https://randomuser.me/api/portraits/men/9.jpg" alt="Avatar" className="avatar" />
                                    ))}
                                </div>
                                <div className="row g-2 pt-4">
                                    <div
                                        className="col-6 d-flex align-items-center"
                                        onClick={() => {
                                            setSelectedProject(project);
                                            console.log('Selected Project:', selectedProject); // In ra thông tin của dự án đã chọn
                                            console.log('Selected Tasks:', tasks); // In ra thông tin của dự án đã chọn


                                        }}

                                    >
                                        <span className="logo">📎</span>
                                        <span className="info">{project.tasks} Nhiệm vụ</span>
                                    </div>
                                    <div
                                        className="col-6 d-flex align-items-center"
                                        onClick={() => handleMemberClick(project)}
                                    >
                                        <span className="logo">👥</span>
                                        <span className="info">
                                            {project.members} Thành viên
                                        </span>
                                    </div>

                                </div>
                                <hr />
                                <div className="project-description-section">
                                    <span className="description-text">Mô tả:   </span>
                                    <p className="project-description">{project.project_description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* {selectedProject && (
                        <TaskModal
                            project={selectedProject}
                            employees={employees}
                            onClose={() => setSelectedProject(null)}
                        />
                    )} */}

            {selectedProject && (
                <TaskModal
                    projectId={selectedProject.id} // Truyền id của dự án
                    project={selectedProject}     // Truyền thông tin dự án
                    onClose={() => setSelectedProject(null)}
                />
            )}

            {/* 
                    {isMemberModalOpen && (
                        <MemberModal
                            members={currentMembers}
                            employees={employees}
                            onClose={() => setIsMemberModalOpen(false)}
                            onSave={handleSaveMembers}
                            currentProjectId={currentProjectId}
                        />
                    )} */}

            {isMemberModalOpen && (
                <MemberModal
                    onClose={() => setIsMemberModalOpen(false)}
                    onSave={handleSaveMembers}
                    projectDetails={currentProjectDetails}
                />
            )}



            {isCreateProjectModalOpen && (
                <EditProject
                    onClose={() => setIsCreateProjectModalOpen(false)}
                    onSave={(newProject) => {
                        setProjects((prevProjects) => [...prevProjects, newProject]);
                        setIsCreateProjectModalOpen(false);
                    }}
                    employees={employees}
                />
            )}
        </div>
    );
};

export default ManagerProject;
