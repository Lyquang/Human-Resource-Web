import React, { useState } from 'react';
import './APage.scss';
import { Outlet } from 'react-router-dom';
import AHeader from './AHeader';
import ASidebar from './ASidebar';
import './AAdminPage.scss';

const AdminPage = () => {
  // Thêm trạng thái để theo dõi trạng thái của sidebar
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  // Hàm để thay đổi trạng thái sidebar
  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  return (
    <div className="app-container">
      <ASidebar expanded={isSidebarExpanded} toggleSidebar={toggleSidebar} /> {/* Truyền trạng thái và hàm vào ASidebar */}
      <div
        className="main-content"
        style={{
          marginLeft: isSidebarExpanded ? '250px' : '80px',
          width: `calc(100% - ${isSidebarExpanded ? '250px' : '80px'})`, // Đảm bảo .main-content chiếm hết phần không gian còn lại sau sidebar
        }}// Thay đổi margin-left dựa vào trạng thái sidebar
      >
        <AHeader /> {/* Header positioned at the top, next to the sidebar */}
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
