import React from 'react';
import './EDashboard.scss';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="welcome-section">
        <div className="left-section">
          <h1>Hello Arpita <span role="img" aria-label="wave">👋</span></h1>
          <p>You can manage your things from here</p>
        </div>
        <div className="right-section">
          <h1>Welcome</h1>
        </div>
      </div>
      <div className="widget-grid">
          <div className="frame employee">Nhân viên</div>
          <div className="frame attendance">Chấm công</div>
          <div className="frame salary">Tiền lương và phúc lợi</div>
          <div className="frame department">Phòng ban</div>
          <div className="frame project">Dự án</div>
          <div className="frame training">Đào tạo và phát triển</div>
          <div className="frame statistic">Thống kê</div>
      </div>
    </div>
  );
};

export default Dashboard;
