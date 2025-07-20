import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import MainSideBar from "./MainSideBar";
import "bootstrap/dist/css/bootstrap.min.css";

const MainPage = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  const { data: personnel, loading, error } = useSelector((state) => state.personnel);

  if (loading) return <div className="p-5">Loading...</div>;
  if (error) return <div className="alert alert-danger p-5">{error}</div>;

  return (
    <div className="d-flex vh-100 bg-light" style={{ zIndex: 0 }}>
      {/* Sidebar (toggleable width) */}
      <div 
        style={{
          // width: isSidebarExpanded ? "250px" : "80px",
          transition: "width 0.3s",
          overflow: "hidden",
          zIndex: 1000,
        }}
      >
        <MainSideBar
          expanded={isSidebarExpanded}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {/* Main content area (flex-grow) */}
      <div className=" flex-grow-1 p-1 overflow-auto bg-light w-50 " >
        <Outlet context={{ personnel }} />
      </div>
    </div>
  );
};

export default MainPage;
