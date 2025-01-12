import React, { useState, useEffect } from "react";
import axios from "axios";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [newBanner, setNewBanner] = useState(null);
  const [editingBanner, setEditingBanner] = useState(null);
  const [message, setMessage] = useState("");
  const [isModified, setIsModified] = useState(false); // Trạng thái để hiển thị nút Update

  // Lấy danh sách banner từ server
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/get-banners");
      setBanners(response.data.banners);
    } catch (error) {
      setMessage("Error loading banner list.");
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBanner(file);
    }
  };

  const handleAddBanner = async () => {
    if (!newBanner) {
      setMessage("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("banner", newBanner);

    try {
      await axios.post("http://localhost:8000/admin/add-banner", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Banner added successfully.");
      fetchBanners();
      setNewBanner(null);
      setIsModified(false);
    } catch (error) {
      setMessage("Error connecting to server.");
    }
  };

  const handleDeleteBanner = async (bannerId) => {
    try {
      await axios.delete(`http://localhost:8000/admin/delete-banner/${bannerId}`);
      setMessage("Deleted successfully.");
      setIsModified(true);
      setBanners(banners.filter((banner) => banner.id !== bannerId));
    } catch (error) {
      setMessage("Error deleting banner.");
    }
  };

  const handleEditBanner = (banner) => {
    setEditingBanner(banner);
  };

  const handleSaveEditBanner = async () => {
    if (!editingBanner || !newBanner) return;

    const formData = new FormData();
    formData.append("banner", newBanner);

    try {
      await axios.put(`http://localhost:8000/admin/update-banner/${editingBanner.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Updated successfully.");
      fetchBanners();
      setEditingBanner(null);
      setNewBanner(null);
    } catch (error) {
      setMessage("Error updating banner.");
    }
  };

  const handleReorder = (startIndex, endIndex) => {
    const reorderedBanners = [...banners];
    const [movedItem] = reorderedBanners.splice(startIndex, 1);
    reorderedBanners.splice(endIndex, 0, movedItem);
    setBanners(reorderedBanners);
    setIsModified(true); // Kích hoạt nút Update
  };

  const handleUpdateOrder = async () => {
    try {
      const reorderedIds = banners.map((banner) => banner.id);
      await axios.post("http://localhost:8000/admin/update-banner-order", { ids: reorderedIds });
      setMessage("Order updated successfully.");
      setIsModified(false);
    } catch (error) {
      setMessage("Error updating banner order.");
    }
  };

  return (
    <div className="admin-banner-manager">
      <h1>Banners Management</h1>

      {/* Danh sách banner */}
      <div className="banner-list">
        {banners.map((banner, index) => (
          <div key={banner.id} className="banner-item" draggable>
            <img
              src={banner.imageUrl}
              alt="Banner"
              style={{ width: "200px", height: "100px" }}
            />
            <p>Banner ID: {banner.id}</p>
            <button onClick={() => handleEditBanner(banner)}>Edit</button>
            <button onClick={() => handleDeleteBanner(banner.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Chỉnh sửa banner */}
      {editingBanner && (
        <div className="edit-banner">
          <h3>Edit Banner</h3>
          <p>Current Image:</p>
          <img
            src={editingBanner.imageUrl}
            alt="Current Banner"
            style={{ width: "200px", height: "100px" }}
          />
          <input type="file" accept="image/*" onChange={handleBannerChange} />
          <button onClick={handleSaveEditBanner}>Save</button>
          <button onClick={() => setEditingBanner(null)}>Cancel</button>
        </div>
      )}

      {/* Thêm banner mới */}
      <div className="add-banner">
        <input type="file" accept="image/*" onChange={handleBannerChange} />
        <button onClick={handleAddBanner}>Add</button>
      </div>

      {/* Nút cập nhật thứ tự */}
      {isModified && (
        <button
          onClick={handleUpdateOrder}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update
        </button>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default Banner;
