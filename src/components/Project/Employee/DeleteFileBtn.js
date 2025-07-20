import React from "react";
import axios from "axios";

export const DeleteFileBtn = ({ taskId, task, setTasks }) => {
  const handleDeleteFiles = async  (taskId) => {
    try {
      const response = await axios.put(
        "http://localhost:8080/api/tasks/unsubmit",
        null,
        {
          params: { taskId: taskId },
        }
      );
      if (response.status ===200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId
              ? { ...task, files: null, isUploaded: false, isSent: false }
              : task
          )
        );
        alert(`File deleted for task ID: ${taskId}`);
      }
    } catch (error) {
      console.error("Error deleting files:", error);
      alert("An error occurred while deleting files.");
    }
  };

  return (
    <button onClick={() => handleDeleteFiles(taskId)} className="btn btn-success mx-1">
      ❌ Remove
    </button>
  );
};

