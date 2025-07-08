import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PiNotePencilDuotone } from 'react-icons/pi';
import { GrMoney } from 'react-icons/gr';
import { TfiStatsUp } from 'react-icons/tfi';
import { FaProjectDiagram, FaRegUser } from 'react-icons/fa';
import { GiTeamUpgrade } from 'react-icons/gi';
import { BiLogOut, BiChat, BiX, BiChevronRight, BiChevronDown } from 'react-icons/bi';
import { FaSitemap } from 'react-icons/fa'; // Import the icon
import { FaHome } from "react-icons/fa";
import './ASidebar.scss';

function ASidebar({ expanded, toggleSidebar }) {
  // const [expanded, setExpanded] = useState(() => {
  //   const savedState = localStorage.getItem('sidebarExpanded');
  //   return savedState === null ? true : JSON.parse(savedState);
  // });


  const [projectDropdown, setProjectDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [isLogoHidden, setIsLogoHidden] = useState(false); // Trạng thái checkbox để ẩn logo

  const toggleLogo = (e) => {
    setIsLogoHidden(e.target.checked); // Cập nhật trạng thái khi checkbox thay đổi
  };

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    setScrolled(scrollTop > 20);
  }

  const toggleProjectDropdown = () => {
    setProjectDropdown((prev) => !prev);
  };

  // const toggleSidebar = () => {
  //   setExpanded((prev) => {
  //     const newExpandedState = !prev;
  //     localStorage.setItem('sidebarExpanded', JSON.stringify(newExpandedState)); // Lưu vào localStorage
  //     return newExpandedState;
  //   });
  // };
  return (
    <div className={`sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <div className="header-row">
          <span className={`logo ${isLogoHidden ? 'hide-text' : ''}`}>BK-MANARATE</span>
          {/* <button onClick={() => setExpanded((prev) => !prev)} className="toggle-btn" aria-label="Toggle Sidebar">
            {expanded ? 'X' : '>'}
          </button> */}
          <button onClick={toggleSidebar} className="toggle-btn" aria-label="Toggle Sidebar">
            {expanded ? 'X' : '>'}
          </button>

        </div>
        <div className="user-info">
          <img className="avatar rounded-circle" src="https://randomuser.me/api/portraits/women/1.jpg" alt="User Avatar" />
          {expanded && <span className="user-name">Admin</span>}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">

        <NavLink to="" className="nav-link-side" activeClassName="active-link">
          <FaHome />
          <span className={`link-text ${expanded ? 'show' : ''}`}>Trang chủ</span>
        </NavLink>

        <NavLink to="employee" className="nav-link-side" activeClassName="active-link">
          <FaRegUser />
          <span className={`link-text ${expanded ? 'show' : ''}`}>Nhân viên</span>
        </NavLink>

        <NavLink to="department" className="nav-link-side" activeClassName="active-link">
          <FaSitemap />
          <span className={`link-text ${expanded ? 'show' : ''}`}>Phòng ban</span>
        </NavLink>

        <NavLink to="admin-attendance" className="nav-link-side" activeClassName="active-link">
          <PiNotePencilDuotone />
          <span className={`link-text ${expanded ? 'show' : ''}`}>Chấm công</span>
        </NavLink>

        <NavLink to="admin-salary" className="nav-link-side" activeClassName="active-link">
          <GrMoney />
          <span className={`link-text ${expanded ? 'show' : ''}`}>Tiền lương và phúc lợi</span>
        </NavLink>



        <NavLink to="logout" className="nav-link-side" activeClassName="active-link">
          <BiLogOut />
          <span className={`link-text ${expanded ? 'show' : ''}`}>Đăng xuất</span>
        </NavLink>

      </div>
      {/* <div className="checkbox-section">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={isLogoHidden}
            onChange={toggleLogo}
            className="checkbox-input"
          />
          <span className={`link-text ${expanded ? 'show' : ''}`}>Hide Logo</span>
        </label>
      </div> */}
    </div>
  );
}

export default ASidebar;