import React from "react";

export const DeleteProjectBtn = ({projectId,setProjects}) => {

    
    const handleDeleteProject = (projectId) => {
        setProjects((prevProjects) => prevProjects.filter(project => project.id !== projectId));
    };
  return (
    <button
      className="btn-delete btn-danger"
      onClick={() => handleDeleteProject(projectId)}
    >
      &#10005;
    </button>
  );
};
{
  /* <button className="btn-delete btn-danger" onClick={() => handleDeleteProject(project.id)}>
                                &#10005;
                            </button> */
}
