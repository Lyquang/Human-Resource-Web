export const FileUploadBtn = ({ taskId, setTasks}) => {
  const handleFileUpload = (event,taskId) => {
    const files = Array.from(event.target.files);
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              files: files,
              isUploaded: true,
              isSent: false,
            }
          : t
      )
    );
    console.log("pass upload")
  };

  return (
    <>
      <input
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.png"
        multiple
        id={`upload-${taskId}`}
        style={{ display: "none" }}
        onChange={(event) =>handleFileUpload(event,taskId)}
      />
      <label htmlFor={`upload-${taskId}`} className="btn btn-success mx-1">
        📂 Upload
      </label>
    </>
  );
};

                // <input
                //   type="file"
                //   accept=".pdf, .doc, .docx, .jpg, .png"
                //   multiple
                //   onChange={(e) => handleFileUpload(e, task.id)}
                //   className="file-input"
                //   id={`upload-${task.id}`}
                // />
                // <label htmlFor={`upload-${task.id}`} className="upload-button">
                //   📂 Upload Files
                // </label>
