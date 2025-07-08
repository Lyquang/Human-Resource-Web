import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PiNotePencilDuotone } from 'react-icons/pi';
import { FaProjectDiagram, FaRegUser, FaHome } from 'react-icons/fa';
import { GiTeamUpgrade } from 'react-icons/gi';
import { BiLogOut, BiChat, BiChevronDown } from 'react-icons/bi';
import './ESidebar.scss';

function ESidebar({ accountId, token }) {
  const [expanded, setExpanded] = useState(true);
  const [projectDropdown, setProjectDropdown] = useState(false);
  const [personnel, setPersonnel] = useState(null); // State to store personnel data

  // Fetch personnel data from API using fetch
  useEffect(() => {

    const token = localStorage.getItem("token");
    const accountId = localStorage.getItem("accountId");
    console.log("accountID, token", accountId, token);
    if (!accountId || !token) return; // Avoid making the call if accountId or token is not available

    const fetchPersonnel = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/employee/account?id=${accountId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setPersonnel(data);
          console.log("personnel >>>", personnel);
        } else {
          console.error('Error fetching personnel data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching personnel data:', error);
      }
    };

    fetchPersonnel();
  }, [accountId, token]);  // Only re-run if accountId or token change

  const toggleProjectDropdown = () => {
    setProjectDropdown((prev) => !prev);
  };

  return (
    <div className={`sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <div className="header-row">
          <span className="logo">BK-MANARATE</span>
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="toggle-btn"
            aria-label="Toggle Sidebar"
          >
            {expanded ? 'X' : '>'}
          </button>
        </div>
        <div className="user-info">
          <img
            className="avatar rounded-circle"
            src={personnel?.avatar || 'https://via.placeholder.com/50'}
            alt="User Avatar"
          />
          {expanded && (
            <span className="user-name">
              {personnel?.lastName && personnel?.firstName
                ? `${personnel.lastName} ${personnel.firstName}`
                : 'Loading...'}
            </span>
          )}
        </div>
      </div>

      <div className="nav-links">
        <NavLink to="/login/employee" className="nav-link-side" activeClassName="active-link">
          <FaHome />
          <span className={`link-text ${expanded ? 'show' : ''}`}>Trang chủ</span>
        </NavLink>

        <NavLink
          to="infor"
          className="nav-link-side"
          activeClassName="active-link"
        >
          <FaRegUser />
          <span className={`link-text ${expanded ? 'show' : ''}`}>Thông tin</span>
        </NavLink>

        <NavLink
          to="attendance"
          className="nav-link-side"
          activeClassName="active-link"
        >
          <PiNotePencilDuotone />
          <span className={`link-text ${expanded ? 'show' : ''}`}>Chấm công</span>
        </NavLink>

        <NavLink
          to="submittask"
          className="nav-link-side"
          activeClassName="active-link"
        >
          <FaProjectDiagram />
          <span className={`link-text ${expanded ? 'show' : ''}`}>Nộp task</span>
        </NavLink>


        {expanded && projectDropdown && (
          <div className="dropdown-content">
            <NavLink
              to="participation"
              className="dropdown-item"
              activeClassName="active-link"
            >
              Các dự án tham gia
            </NavLink>
            <NavLink
              to="submittask"
              className="dropdown-item"
              activeClassName="active-link"
            >
              Nộp task
            </NavLink>
          </div>
        )}

        <NavLink to="notification" className="nav-link-side" activeClassName="active-link">
          <BiChat />
          <span className={`link-text ${expanded ? 'show' : ''}`}>Thông báo</span>
        </NavLink>
        <NavLink
          to="logout"
          className="nav-link-side"
          activeClassName="active-link"
        >
          <BiLogOut />
          <span className={`link-text ${expanded ? 'show' : ''}`}>Đăng xuất</span>
        </NavLink>
      </div>
    </div>
  );
}

export default ESidebar;
