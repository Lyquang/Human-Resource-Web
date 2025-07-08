import React, { useState, useEffect } from "react";
import "./EmployeeNotification.scss";
import axios from "axios";

const EmployeeNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch personelCode based on accountId and save it to localStorage
  useEffect(() => {
    const fetchPersonnelCode = async () => {
      try {
        const token = localStorage.getItem("token");
        const accountId = localStorage.getItem("accountId");

        console.log("accountid", accountId);

        if (!token || !accountId) {
          throw new Error("Authentication token or account ID not found");
        }

        const response = await fetch(
          `http://localhost:8080/api/employee/account?id=${accountId}`,
          {

            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // console.log(response.data);

        // if (response.status !== 200 || !response.data.personelCode) {
        //   throw new Error("Failed to fetch personnel code");
        // }
        const data = await response.json();
        console.log("data.personelCode", data.personelCode)

        // Save personnelCode to localStorage
        localStorage.setItem("personelCode", data.personelCode);


      } catch (err) {
        console.error("Error fetching personnel code:", err);
        setError(err.message);
      }
    };

    fetchPersonnelCode();
  }, []);

  // Fetch notifications based on personnelCode
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const personelCode = localStorage.getItem("personelCode");
        const token = localStorage.getItem("token");

        if (!personelCode || !token) {
          throw new Error("Personnel code or token not found");
        }

        const response = await axios.get(
          `http://localhost:8080/api/notifications/my-notification`,
          {
            params: { personnelId: personelCode },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.code === 1000) {
          const formattedNotifications = response.data.result.map((item) => ({
            id: item.id,
            title: item.title,
            content: item.content,
            sender: item.sender.name,
            createdAt: item.createdAt,
            read: item.read,
          }));
          setNotifications(formattedNotifications);
        } else {
          throw new Error(response.data.message || "Failed to fetch notifications");
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Mark a notification as read
  const markAsRead = async (id) => {
    try {
      const personelCode = localStorage.getItem("personelCode");
      const token = localStorage.getItem("token");

      if (!personelCode || !token) {
        throw new Error("personel code or token not found");
      }

      await axios.post(
        `http://localhost:8080/api/notifications/${id}/mark`,
        null,
        {
          params: { personnelId: personelCode },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
      setError(err.message);
    }
  };

  if (loading) return <div>Loading notifications...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="notifications-container">
      <h2>Thông báo</h2>
      <div className="notifications-grid">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-card ${notification.read ? "read" : "unread"}`}
            style={{
              borderLeft: `5px solid ${notification.read ? "green" : "blue"}`,
            }}
          >
            <div className="notification-header">
              <h3 className="notification-title">{notification.title}</h3>
              {!notification.read && <span className="new-badge">Mới</span>}
            </div>
            <p className="notification-content">{notification.content}</p>
            <div className="notification-footer">
              <span className="sender-name">
                Người gửi: {notification.sender}
              </span>
              <span className="created-at">{notification.createdAt}</span>
              {!notification.read && (
                <button
                  className="mark-read-button"
                  onClick={() => markAsRead(notification.id)}
                >
                  Đánh dấu đã đọc
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeNotification;
