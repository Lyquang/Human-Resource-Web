
import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../../index.css";
import "./AllEmployee.css";

const ModalOfEachEmployee = ({ show, onClose, employee }) => {
  if (!employee) return null;

  const {
    personelCode,
    firstName,
    lastName,
    email,
    phone,
    city,
    street,
    gender,
    position,
    departmentName,
    taskList,
    tasksCompleteNumber,
    projectList,
    projectInvolved,
    avatar,
  } = employee;

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      dialogClassName="full-width-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Thông tin chi tiết nhân viên</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-3 text-center">
            <img
              src={avatar || "https://via.placeholder.com/150"}
              alt="avatar"
              className="img-fluid rounded-circle mb-3"
              style={{ maxWidth: "150px" }}
            />
            <h5>{lastName} {firstName}</h5>
            <p className="text-muted">{position}</p>
          </div>
          <div className="col-md-9">
            <p><strong>Mã nhân viên:</strong> {personelCode}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>SĐT:</strong> {phone}</p>
            <p><strong>Giới tính:</strong> {gender === "MALE" ? "Nam" : "Nữ"}</p>
            <p><strong>Địa chỉ:</strong> {street}, {city}</p>
            <p><strong>Phòng ban:</strong> {departmentName || "Không có"}</p>
            <p><strong>Số task đã hoàn thành:</strong> {tasksCompleteNumber}</p>
            <p><strong>Số dự án tham gia:</strong> {projectInvolved}</p>

            {taskList && taskList.length > 0 && (
              <>
                <strong>Danh sách công việc:</strong>
                <ul>
                  {taskList.map((task, idx) => (
                    <li key={idx}>{task}</li>
                  ))}
                </ul>
              </>
            )}

            {projectList && projectList.length > 0 && (
              <>
                <strong>Dự án đã tham gia:</strong>
                <ul>
                  {projectList.map((project, idx) => (
                    <li key={idx}>{project}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalOfEachEmployee;
