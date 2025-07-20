

import "bootstrap/dist/css/bootstrap.min.css";

import TaskCard from "./TaskCard";

const SubmitTask = () => {


  return (
    <div className="container my-5 bg-light">
      <h2 className="text-center text-primary mb-4 fw-bold">My Task</h2>
      <TaskCard/>
      
    </div>
  );
};

export default SubmitTask;
