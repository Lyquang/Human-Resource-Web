import React, { useEffect, useState } from "react";
import axios from "axios";
import { FileUploadBtn } from "./FileUploadBtn";
import { DeleteFileBtn } from "./DeleteFileBtn";
import { SendFileBtn } from "./SendFileBtn";
import { useSelector } from "react-redux";

export const TaskCard = () => {
  const { personnel } = useSelector((state) => state);

  const [tasks, setTasks] = useState([]);
  const personelCode = localStorage.getItem("personelCode");
  console.log("personelCode at SubmitTask >>>> ", personelCode);
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/tasks/employee",
        {
          params: { code: personelCode },
        }
      );
      if (response.data && response.data.result) {
        const fetchedTasks = response.data.result.map((task) => ({
          id: task.tasksId,
          name: task.title,
          description: task.description,
          due: formatDueDate(task.due),
          status: task.status,
          proj_id: task.projectName,
          files: task.fileName
            ? [{ name: task.fileName, url: task.fileUrl }]
            : [],
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
  };

  useEffect(() => {
    fetchTasks();
  }, [personelCode]);

  const formatDueDate = (due) => {
    const date = new Date(due); // Parse the ISO string into a Date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="row">
      {tasks.map((task) => (
        <div key={task.id} className="col-md-6 col-lg-4 mb-4 ">
          <div
            className={`card shadow-sm border-0 h-100  
          ${
            task.status === "COMPLETED"
              ? "bg-success text-white"
              : task.status === "OVERDUE"
              ? "bg-danger text-white"
              : "bg-warning text-dark"
          }`}
          style={{borderRadius:'20px'}}
          >
            <div className="card-header fw-bold" style={{ fontSize: "1.5rem" }}>
              Title: {task.name || "N/A"}{" "}
            </div>

            <div className="card-body bg-white text-dark" >
              <ul className="list-unstyled medium g-4">
                <li>
                  <strong>TaskID:</strong> {task.id}
                </li>
                <li>
                  <strong>Belong to the Project :</strong> {task.proj_id}
                </li>
                <li>
                  <strong>Task description :</strong> {task.description}
                </li>
                <li>
                  <strong>Ngày hết hạn:</strong> {task.due}
                </li>
                <li>
                  <strong>Trạng thái:</strong> {task.status}
                </li>
              </ul>

              <div className="text-center mt-3">
                <FileUploadBtn taskId={task.id} setTasks={setTasks} />
                <SendFileBtn taskId={task.id} task={task} setTasks={setTasks} />
                <DeleteFileBtn
                  taskId={task.id}
                  task={task}
                  setTasks={setTasks}
                />
              </div>

              {task.files?.length > 0 && (
                <div className="mt-3">
                  <p className="mb-1 font-italic text-muted">Tệp đã tải lên:</p>
                  {task.files.map((file, index) => (
                    <a
                      key={index}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-block text-truncate"
                    >
                      📄 {file.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TaskCard;
