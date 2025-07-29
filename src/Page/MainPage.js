import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import MainSideBar from "./MainSideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowUp } from "react-icons/fa";
import "../index.css";
import Message_icon from "../components/assets/icon_message.svg";
import { ThemeProvider } from "../ThemeContext";
import ThemeSwitcher from "../ThemeSwitcher";
import { toast, ToastContainer } from "react-toastify";     

const MainPage = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  const {
    data: personnel,
    loading,
    error,
  } = useSelector((state) => state.personnel);

  if (loading) return <div className="p-5">Loading...</div>;
  if (error) return <div className="alert alert-danger p-5">{error}</div>;

  return (
    <ThemeProvider>
            <ToastContainer />
      <div className="d-flex vh-100 " style={{ zIndex: 0 }}>
        <div className="main-siderbar">
          <MainSideBar
            expanded={isSidebarExpanded}
            toggleSidebar={toggleSidebar}
          />
        </div>

        <div className=" flex-grow-1 p-1 overflow-auto w-50 ">
          <Outlet context={{ personnel }} />
        </div>
        <div>
          <a
            className="btn-to-top rounded-circle shadow-lg"
            title="Lên đầu trang"
          >
            <ThemeSwitcher></ThemeSwitcher>
          </a>

          <a
            href=""
            class="btn-message btn-primary rounded-circle shadow-lg"
            title="Liên hệ & Góp ý"
          >
            <span class="rounded-circle">
              <img className="img-message" src={Message_icon} alt="nodes" />
            </span>
          </a>
          
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MainPage;
