import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export const DeleteDepartmentBtn = ({ departmentId }) => {
  const deleteDepartment = async () => {
    if (!departmentId) {
      alert("❌ Thiếu mã phòng ban!");
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn xóa phòng ban này không?")) {
      try {
        console.log("🔁 Đang xóa phòng ban với ID:", departmentId);

        // B1: Gọi API xóa trưởng phòng
        const removeManagerRes = await axios.delete(`http://localhost:8080/api/managers/remove`, {
          params: { deptId: departmentId }
        });

        // B2: Gọi API xóa phòng ban
        const removeDeptRes = await axios.delete(`http://localhost:8080/api/departments/delete`, {
          params: { id: departmentId }
        });

        // B3: Kiểm tra và thông báo
        if (removeManagerRes.status === 200 && removeDeptRes.status === 200) {
          alert("✅ Đã xóa phòng ban thành công!");
          window.location.reload(); // hoặc bạn gọi lại API `fetchDepartments()` nếu dùng state
        } else {
          alert("❌ Không thể xóa phòng ban.");
        }
      } catch (error) {
        console.error("❌ Error deleting the department:", error);
        if (error.response) {
          console.log("📥 Server response:", error.response.data);
        }
        alert("❌ Đã xảy ra lỗi khi xóa phòng ban.");
      }
    }
  };

  return (
    <button className="btn btn-danger" onClick={deleteDepartment}>
      <i className="fas fa-trash-alt"></i> Xóa
    </button>
  );
};
export default DeleteDepartmentBtn;