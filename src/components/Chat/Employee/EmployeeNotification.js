import React, { useState, useEffect } from "react";
import "./EmployeeNotification.scss";
import axios from "axios";
import { NotificationBar } from "./NotificationBar";

const EmployeeNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notifications based on personnelCode

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
        throw new Error(
          response.data.message || "Failed to fetch notifications"
        );
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) return <div>Loading notifications...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="notifications-container">
      <h2>Thông báo</h2>
      <div className="notifications">
        {notifications.map((notification) => (
          <NotificationBar key={notification.id} notification={notification} fetchNotifications={fetchNotifications} 
          setNotifications ={setNotifications} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeNotification;
