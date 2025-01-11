import React, { useState } from "react";
import { FaEdit } from "react-icons/fa"; // Biểu tượng chỉnh sửa

const ViewProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Điều khiển trạng thái của modal
  const [name, setName] = useState("Nguyễn Văn A");
  const [email, setEmail] = useState("nguyenvana@example.com");
  const [phone, setPhone] = useState("0987654321");

  // Mở modal chỉnh sửa thông tin
  const openModal = () => setIsModalOpen(true);

  // Đóng modal
  const closeModal = () => setIsModalOpen(false);

  // Hàm lưu thông tin chỉnh sửa
  const handleSave = () => {
    // Lưu thông tin (thực hiện API nếu cần thiết)
    alert("Thông tin đã được cập nhật!");
    closeModal();
  };

  return (
    <div className="view-profile">
      <h1>View Profile</h1>
      <div className="profile-info">
        <div><strong>Name:</strong> {name}</div>
        <div><strong>Email:</strong> {email}</div>
        <div><strong>Phone Number:</strong> {phone}</div>
      </div>

      {/* Nút chỉnh sửa */}
      <button className="edit-button" onClick={openModal}>
        <FaEdit /> Edit
      </button>

      {/* Modal chỉnh sửa thông tin */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit</h2>
            <div className="edit-form">
              <div>
                <label>Tên:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label>Số điện thoại:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <button className="close-button" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
