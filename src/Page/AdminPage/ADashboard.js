import React from 'react';
import { Link } from 'react-router-dom';
import './ADashboard.scss';

const Dashboard = () => {
    const cards = [
        { title: "Nhân viên", description: "Danh sách nhân viên", route: "/login/admin/employee" },
        { title: "Chấm công", description: "Điểm danh & chấm công", route: "/login/admin/admin-attendance" },
        { title: "Tiền lương và phúc lợi", description: "Quản lý tiền lương và phúc lợi", route: "/login/admin/admin-salary" },
        { title: "Phòng ban", description: "Quản lý phòng ban", route: "/login/admin/department" },
        { title: "Dự án", description: "Xem và quản lý dự án", route: "/login/admin/project" },
        { title: "Đào tạo & phát triển", description: "Xem đào đào và phát triển", route: "/login/admin/admin-training" },
        { title: "Thống kê", description: "Thống kê số liệu", route: "/login/admin/statistic" },
        { title: "Tin nhắn", description: "Nhắn tin cho người khác", route: "/login/admin/chat" },
    ];

    return (
        <div className="container-fluid dashboard">
            {/* Row 1 */}
            <div className="row">
                {cards.slice(0, 4).map((card, index) => (
                    <div className="col-sm-3 dashboard-card" key={index}>
                        <Link to={card.route} className="card-link">
                            <div className="card-box">
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            {/* Row 2 */}
            <div className="row">
                {cards.slice(4, 8).map((card, index) => (
                    <div className="col-sm-3 dashboard-card" key={index}>
                        <Link to={card.route} className="card-link">
                            <div className="card-box">
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;