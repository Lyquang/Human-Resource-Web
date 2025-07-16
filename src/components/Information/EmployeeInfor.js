import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersonelInforCard } from "./PersonelInforCard";

const EmployeeInfor = () => {
  return (
    <div className="container my-4">
      <PersonelInforCard />
    </div>
  );
};
export default EmployeeInfor;
