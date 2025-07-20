import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Attendance from "./components/Attendance/EmployeeAttendance";

// import AdminAttendance from './components/Attendance/AdminAttendance';

import store from "./store";

// import Salary from './components/Salary/Salary';

import { Provider } from "react-redux";

import Training from "./components/Training/Training";
import Statistic from "./components/Statistic/Statistic";

import Home from "./components/Authentication/Home";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";

//import admin

import AdminSalary from "./components/Salary/AdminSalary";
import AdminTraining from "./components/Training/AdminTraining";


import AdminAttendance from "./components/Attendance/AdminAttendance";

//import manager

// import ManagerDevideTask from './components/Project/Manager/ManagerDivideTask';
import ManagerProject from "./components/Project/Manager/ManagerProject";

// import employee
import MainPage from "./Page/MainPage";
import AllEmployee from "./components/Employee/AllEmployee";
import EDashboard from "./Page/EDashboard";
import SubmitTask from "./components/Project/Employee/SubmitTask";
import EmployeeAttendance from "./components/Attendance/EmployeeAttendance";
import EmployeeTraining from "./components/Training/EmployeeTraining";
import PersonelInfor from "./components/Information/PersonelInfor";

// import EmployeeChat from './components/Chat/EmployeeNotifications';

// import ManagerInfor from './components/Information/ManagerInfor';
import ManagerNotification from "./components/Chat/Manager/ManagerNotification";
import EmployeeNotification from "./components/Chat/Employee/EmployeeNotification";
import DepartmentPage from "./components/Department/DepartmentPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route exact path="/login/admin" element={<MainPage />}>
          {/* <Route index element={<ADashboard />}></Route> */}
          <Route path="employee" element={<AllEmployee />} />
          <Route path="admin-attendance" element={<AdminAttendance />} />
          <Route path="admin-salary" element={<AdminSalary />} />
          <Route path="department" element={<DepartmentPage />} />

          <Route path="admin-training" element={<AdminTraining />} />
          <Route path="statistic" element={<Statistic />} />
          {/* <Route path="chat" element={<EmployeeChat />} />
           */}
        </Route>

        <Route exact path="/login/employee" element={<MainPage />}>
          <Route index element={<EDashboard />}></Route>
          <Route path="infor" element={<PersonelInfor />} />
          <Route path="attendance" element={<EmployeeAttendance />} />
          <Route path="submittask" element={<SubmitTask />} />
          <Route path="training" element={<EmployeeTraining />} />
          <Route path="notification" element={<EmployeeNotification />} />
        </Route>

        <Route exact path="/login/manager" element={<MainPage />}>
          {/* <Route index element={<Dashboard />}></Route> */}
          <Route path="infor" element={<PersonelInfor/>} />
          <Route path="attendance" element={<EmployeeAttendance />} />

          {/* <Route path="salary" element={<Salary />} /> */}

          <Route path="department" element={<DepartmentPage />} />
          <Route path="project" element={<ManagerProject />} />
          <Route path="training" element={<EmployeeTraining />} />
          <Route path="notification" element={<ManagerNotification />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
