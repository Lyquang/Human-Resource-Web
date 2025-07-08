import React, { useEffect, useState } from 'react';
import './SubmitTask.css';
import { useSelector } from 'react-redux';
import { getTaskByEmployeeCode, submitTask } from '../../services/apiService';

const SubmitTask = () => {
    const {personnel} = useSelector((state) => state);

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (personnel?.data?.personelCode) {
            fetchTasks();
        }
    }, [personnel?.data?.personelCode])

    const fetchTasks = async () => {
        try {
            const response = await getTaskByEmployeeCode(personnel.data.personelCode);
            if (response.data && response.data.result) {
                const fetchedTasks = response.data.result.map((task) => ({
                    id: task.tasksId,
                    name: task.title,
                    description: task.description,
                    due: formatDueDate(task.due),
                    status: task.status,
                    proj_id: task.projectName, 
                    files: task.fileName ? [{ name: task.fileName, url: task.fileUrl }] : [],
                    isUploaded: false,
                    isSent: false,
                }));
                setTasks(fetchedTasks);
            } else {
                console.error("No tasks found for the employee.");
            }

        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    const handleFileUpload = (event, taskId) => {
        const files = Array.from(event.target.files);
        console.log("Uploaded files:", files);
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId
                    ? { ...task, files: [...(task.files || []), ...files], isUploaded: true }
                    : task
            )
        );


        console.log("pass upload");
    };

    const handleSendFiles = async (taskId) => {
        const task = tasks.find((task) => task.id === taskId);
        if (!task || !task.files || task.files.length === 0) {
            alert("Please upload a file before submitting.");
            return;
        }

        try {
            const file = task.files[0];
            // console.log("Data: >>", taskId, file, personnel.data.personelCode);
            const response = await submitTask(taskId, file, personnel.data.personelCode);
            console.log("Response: >>", response);
           

            setTasks((prevTasks) =>
                prevTasks.map((t) =>
                    t.id === taskId
                        ? { ...t, isSent: true } // Mark task as sent
                        : t
                )
            );

        } catch (error) {
            console.error("Error uploading files:", error);
            alert("An error occurred while uploading files.");
        }
    };

    const handleDeleteFiles = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId
                    ? { ...task, files: null, isUploaded: false, isSent: false }
                    : task
            )
        );
        alert(`File deleted for task ID: ${taskId}`);
    };

    const formatDueDate = (due) => {
        const date = new Date(due); // Parse the ISO string into a Date object
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className="tasks-container">
            <h2 className="tasks-title">Công việc của tôi</h2>
            <div className="tasks-grid">
                {tasks.map((task) => (
                    <div key={task.id} className={`task-card ${task.status === 'COMPLETED' ? 'task-completed' 
                    : task.status === 'OVERDUE' ? 'task-overdue' : 'task-cancelled'}`}>
                        <div className="task-card-header">
                            <p className="task-dept">Phòng ban. {task.dept_id}</p>
                        </div>
                        <div className="task-card-body">
                            <h3 className="task-name">{task.name}</h3>
                            <p className="task-description">{task.description}</p>
                            <p><strong>Ngày hết hạn:</strong> {task.due}</p>
                            <p><strong>Trạng thái:</strong> {task.status}</p>
                            <p><strong>Tên dự án:</strong> {task.proj_id}</p>
                            <div className="file-upload">
                                <input
                                    type="file"
                                    accept=".pdf, .doc, .docx, .jpg, .png"
                                    multiple
                                    onChange={(e) => handleFileUpload(e, task.id)}
                                    className="file-input"
                                    id={`upload-${task.id}`}
                                />
                                <label
                                    htmlFor={`upload-${task.id}`}
                                    className="upload-button"
                                >
                                    📂 Upload Files
                                </label>
                                <button
                                    onClick={() => handleSendFiles(task.id)}
                                    className={`send-button ${task.isSent ? 'done-button' : ''}`}
                                    disabled={task.isSent} // Disable button when sent
                                >
                                    {task.isSent ? "✅ Done" : "📤 Send Files"}
                                </button>
                                <button
                                    onClick={() => handleDeleteFiles(task.id)}
                                    className="delete-button"
                                >
                                    ❌ Cancel
                                </button>
                                {task && task.files && task.files.length > 0 && (
                                    <div className="uploaded-files">
                                        {task.files.map((file, index) => (
                                            <a href={file.url} target="_blank" rel="noopener noreferrer">
                                                📄 {file.name}
                                            </a>
                                            // <p key={index} className="uploaded-file">
                                            //     📄 {file.name}
                                            // </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubmitTask;
