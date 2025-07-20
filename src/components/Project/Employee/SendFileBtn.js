import axios from "axios";
import React from "react";

export const SendFileBtn = ({ taskId, task, setTasks }) => {
  const personelCode = localStorage.getItem("personelCode");
  const isSent = task?.isSent;

  const submitTask = (taskId, file, personelCode) => {
    const formData = new FormData();
    formData.append("taskId", taskId);
    formData.append("file", file);
    formData.append("personnelId", personelCode);

   return axios.post("http://localhost:8080/api/tasks/submit", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },  
    });
     
    // if( respose.ok){
    //   alert("Submit Task Successfull")
    //   return;
    // }
  };

  const handleSendFiles = async () => {
    if (!task || !task.files || task.files.length === 0) {
      alert("Please upload a file before submitting.");
      return;
    }

    try {
      const file = task.files[0];
      const response = await submitTask(taskId, file, personelCode);
      console.log("Response: >>", response);

      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === taskId ? { ...t, isSent: true } : t
        )
      );
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("An error occurred while uploading files.");
    }
  };

  return (
    <button
      className={`btn mx-1 ${isSent ? "btn-success" : "btn-primary"}`}
      onClick={handleSendFiles}
      disabled={isSent}
    >
      {isSent ? "✅ Done" : "📤 Submit"}
    </button>
  );
};
