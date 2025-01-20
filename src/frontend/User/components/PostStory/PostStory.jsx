import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './PostStory.css';  // Sửa lại cách import CSS

function PostStory() {
  // Dữ liệu thể loại
  const categoryData = {
    "Văn học nước ngoài": [
      { id: 16, name: "Thơ" },
      { id: 17, name: "Kịch" },
      { id: 18, name: "Kỳ ảo" },
      { id: 19, name: "Thần thoại" },
      { id: 20, name: "Dân gian" },
      { id: 21, name: "Hiện thực" },
    ],
    "Văn học Việt Nam": [
      { id: 4, name: "Truyện ngắn" },
      { id: 8, name: "Lãng mạn" },
      { id: 6, name: "Kinh dị" },
      { id: 15, name: "Giả tưởng" },
      { id: 10, name: "Hồi ký" },
      { id: 12, name: "Phiêu lưu" },
    ],
    "Tiểu thuyết": [
      { id: 22, name: "Ngôn tình" },
      { id: 23, name: "Đam mỹ" },
      { id: 24, name: "Xuyên không" },
      { id: 25, name: "Hệ thống" },
      { id: 26, name: "Điền văn" },
      { id: 27, name: "Ngọt sủng" },
      { id: 28, name: "Linh dị" },
      { id: 29, name: "Nữ phụ" },
      { id: 30, name: "Thế thân" },
      { id: 31, name: "Dân quốc" },
      { id: 32, name: "OE" },
      { id: 33, name: "Đô thị" },
      { id: 34, name: "HE" },
      { id: 35, name: "SE" },
      { id: 36, name: "Nữ cường" },
      { id: 37, name: "Bách hợp" },
      { id: 38, name: "Trọng sinh" },
      { id: 39, name: "Ngược" },
      { id: 40, name: "Cung đấu" },
      { id: 41, name: "Hài hước" },
      { id: 42, name: "TXVT" },
      { id: 43, name: "Vả mặt" },
      { id: 44, name: "Chữa lành" },
      { id: 45, name: "Mạt thế" },
      { id: 46, name: "Huyền huyễn" },
      { id: 47, name: "Truyện teen" },
      { id: 48, name: "Cổ đại" },
      { id: 49, name: "Hiện đại" },
      { id: 51, name: "Báo thù" },
    ],
  };

  const [storyData, setStoryData] = useState({
    title: '',
    description: '',
    author_name: '',
    status: 'ONGOING',
    category_ids: [],
    selectedCategory: '',
  });

  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    setStoryData({
      ...storyData,
      selectedCategory: e.target.value,
      category_ids: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!storyData.title || !storyData.description || !storyData.author_name || storyData.category_ids.length === 0) {
      toast.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Vui lòng đăng nhập trước!');
        return;
      }

      await axios.post('http://3.26.145.187:8000/api/stories', storyData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      toast.success('Tạo truyện thành công!');
      navigate('/myStories');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Đã xảy ra lỗi!');
    }
  };

  const renderCategoryCheckboxes = () => {
    const categories = categoryData[storyData.selectedCategory];
    if (!categories) return null;
  
    return categories.map((category) => (
      <div key={category.id} className="checkboxWrapper">
        <input
          type="checkbox"
          id={`category-${category.id}`}
          value={category.id}
          checked={storyData.category_ids.includes(category.id)}
          onChange={(e) => {
            const updatedCategories = e.target.checked
              ? [...storyData.category_ids, category.id]
              : storyData.category_ids.filter((id) => id !== category.id);
            setStoryData({ ...storyData, category_ids: updatedCategories });
          }}
        />
        <label htmlFor={`category-${category.id}`}>{category.name}</label>
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="formWrapper">
        <h2>Tạo truyện mới</h2>
        <div className="outerBox">
          <form className="form" onSubmit={handleSubmit}>
            <div className="inputGroup box">
              <label>Tiêu đề:</label>
              <input
                type="text"
                value={storyData.title}
                onChange={(e) => setStoryData({ ...storyData, title: e.target.value })}
              />
            </div>
  
            <div className="inputGroup box">
              <label>Mô tả:</label>
              <textarea
                value={storyData.description}
                onChange={(e) => setStoryData({ ...storyData, description: e.target.value })}
              />
            </div>
  
            <div className="inputGroup box">
              <label>Tên tác giả:</label>
              <input
                type="text"
                value={storyData.author_name}
                onChange={(e) => setStoryData({ ...storyData, author_name: e.target.value })}
              />
            </div>
  
            <div className="inputGroup box">
              <label>Trạng thái:</label>
              <select
                value={storyData.status}
                onChange={(e) => setStoryData({ ...storyData, status: e.target.value })}
              >
                <option value="ONGOING">Đang cập nhật</option>
                <option value="COMPLETED">Hoàn thành</option>
              </select>
            </div>
  
            <div className="inputGroup box">
              <label>Danh mục:</label>
              <select value={storyData.selectedCategory} onChange={handleCategoryChange}>
                <option value="">Chọn thể loại</option>
                {Object.keys(categoryData).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
  
            <div className="inputGroup box">
              <label>Thể loại:</label>
              <div className="categoriesGrid">
                {renderCategoryCheckboxes()}
              </div>
            </div>
  
            <div className="inputGroup box">
              <button type="submit" className="submitButton">
                Tạo truyện
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostStory;
