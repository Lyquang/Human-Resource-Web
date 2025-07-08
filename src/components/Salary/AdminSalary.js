import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NotePencil } from 'phosphor-react';
import AdminSalaryModal from './AdminSalaryModal';
import AdjustRateModal from './AdjustRateModal';
import './AdminSalary.scss';

const AdminSalary = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [showAdjustRateModal, setShowAdjustRateModal] = useState(false);
    const [rates, setRates] = useState({ fullShiftRate: 200, halfShiftRate: 100 });

    const [filterMonth, setFilterMonth] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [Salary, setSalary] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch salary data from API
    useEffect(() => {
        const fetchSalaryData = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get('http://localhost:8080/api/salary/all');
                const data = response.data?.result || [];
                setSalary(data);
            } catch (err) {
                setError('Error fetching salary data. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSalaryData();
    }, []);

    const handleModalOpen = (record) => {
        setSelectedRecord(record);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedRecord(null);
    };

    const handleSave = (updatedRecord) => {
        setSalary((prevSalary) =>
            prevSalary.map((record) =>
                record.id === updatedRecord.id ? updatedRecord : record
            )
        );
    };
    

    const handleAdjustRateModalClose = () => {
        setShowAdjustRateModal(false);
    };

    const handleRateSave = async (updatedRates) => {
        try {
            setRates(updatedRates);
            setShowAdjustRateModal(false);
        } catch (error) {
            console.error('Failed to update rates:', error);
        }
    };

    const filteredSalary = Salary.filter((record) => {
        const monthMatch = filterMonth ? record.month === parseInt(filterMonth) : true;
        const yearMatch = filterYear ? record.year === parseInt(filterYear) : true;
        return monthMatch && yearMatch;
    });

    return (
        <div className="admin-salary-container">
            <h3 className="title">Bảng lương nhân viên</h3>

            {/* Filters for Month and Year */}
            <div className="filters">
                <div className="filter-group">
                    <label htmlFor="month">Tháng:</label>
                    <select
                        id="month"
                        value={filterMonth}
                        onChange={(e) => setFilterMonth(e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        {[...Array(12).keys()].map((m) => (
                            <option key={m + 1} value={m + 1}>
                                {m + 1}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <label htmlFor="year">Năm:</label>
                    <select
                        id="year"
                        value={filterYear}
                        onChange={(e) => setFilterYear(e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        {[...new Set(Salary.map((r) => r.year))].map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Error and Loading */}
            {loading && <p>Đang tải dữ liệu...</p>}
            {error && <p className="error">{error}</p>}

            {/* Salary Table */}
            <div className="salary-table">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Mã nhân viên</th>
                            <th>Tên nhân viên</th>
                            <th>Tháng</th>
                            <th>Năm</th>
                            <th>Số ngày đủ ca</th>
                            <th>Số ngày nửa ca</th>
                            <th>Số ngày vắng</th>
                            <th>Thưởng</th>
                            <th>Phạt</th>
                            <th>Lương thực tế</th>
                            <th>Chỉnh sửa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSalary.map((record, index) => (
                            <tr key={index}>
                                <td>{record.employeeCode}</td>
                                <td>{`  ${record.lastName} ${record.firstName} `}</td>
                                <td>{record.month}</td>
                                <td>{record.year}</td>
                                <td>{record.fullWork}</td>
                                <td>{record.halfWork}</td>
                                <td>{record.absence}</td>
                                <td className="text-success">{record.bonus}Đ</td>
                                <td className="text-danger">{record.penalty}Đ</td>
                                <td className="text-success">{record.realPay}Đ</td>
                                <td>
                                    <button
                                        className="btn-edit"
                                        onClick={() => handleModalOpen(record)}
                                    >
                                        <NotePencil size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button
                className="btn-adjust-rate"
                onClick={() => setShowAdjustRateModal(true)}
            >
                Điều chỉnh hệ số
            </button>
            <AdminSalaryModal
                show={showModal}
                handleClose={handleModalClose}
                record={selectedRecord}
                handleSave={handleSave}
            />
            <AdjustRateModal
                show={showAdjustRateModal}
                handleClose={handleAdjustRateModalClose}
                rates={rates}
                handleSave={handleRateSave}
            />
        </div>
    );
};

export default AdminSalary;
