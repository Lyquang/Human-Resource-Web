import React, { useState, useEffect } from "react";
import "./ManagerNotification.scss";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const ManagerNotification = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: "",
    content: "",
    senderId: 0,
    recipientIds: [],
    sendToAll: false,
  });

  useEffect(() => {
    const fetchSenderId = async () => {
      try {
        const token = localStorage.getItem("token");
        const accountId = localStorage.getItem("accountId");

        if (!token || !accountId) {
          throw new Error("Authentication token or account ID not found");
        }

        const response = await fetch(
          `http://localhost:8080/api/managers/account?id=${accountId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch sender ID");
        }

        const data = await response.json();
        setNewNotification((prev) => ({ ...prev, senderId: data.personelCode }));
      } catch (err) {
        console.error("Error fetching sender ID:", err);
        alert(err.message);
      }
    };

    fetchSenderId();
  }, []);

  const handleCreateNotification = async () => {
    try {
      const formattedNotification = {
        ...newNotification,
        recipientIds: Array.isArray(newNotification.recipientIds)
          ? newNotification.recipientIds.filter((id) => !isNaN(id))
          : [],
      };
      const response = await axios.post(
        "http://localhost:8080/api/notifications/send",
        formattedNotification
      );
      if (response.data.code === 1000) {
        alert("Notification sent successfully!");
        setShowCreateModal(false);
        setNewNotification({
          title: "",
          content: "",
          senderId: newNotification.senderId,
          recipientIds: [],
          sendToAll: false,
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      console.error("Error sending notification:", err);
      alert("Failed to send notification.");
    }
  };

  return (
    <div className="notifications-container">
      <div className="header">
        <h2>Gửi thông báo</h2>
        <button className="create-notification-button" onClick={() => setShowCreateModal(true)}>
          <span className="material-icons">add_alert</span>
        </button>
      </div>

      {/* Create Notification Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tiêu đề"
                value={newNotification.title}
                onChange={(e) =>
                  setNewNotification({ ...newNotification, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContent">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Nhập nội dung"
                value={newNotification.content}
                onChange={(e) =>
                  setNewNotification({ ...newNotification, content: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRecipients">
              <Form.Label>ID người nhân (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập ID người nhận cách nhau bởi dấu ,"
                value={newNotification.recipientIds.join(",")}
                onChange={(e) => {
                  const inputValue = e.target.value || "";
                  setNewNotification({
                    ...newNotification,
                    recipientIds: inputValue
                      .split(",") // Split by commas
                      .map((id) => parseInt(id.trim(), 10)) // Convert to integers, trimming spaces
                      .filter((id) => !isNaN(id)), // Filter out invalid entries
                  });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSendToAll">
              <Form.Check
                type="checkbox"
                label="Gửi đến tất cả nhân viên trong phòng ban"
                checked={newNotification.sendToAll}
                onChange={(e) =>
                  setNewNotification({ ...newNotification, sendToAll: e.target.checked })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleCreateNotification}>
            Gửi thông báo
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManagerNotification;
