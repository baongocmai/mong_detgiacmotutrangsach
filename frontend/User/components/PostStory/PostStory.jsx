import axios from "axios";
import React, { useState, useEffect } from "react";
import "./PostStory.css";
import { Link } from "react-router-dom";

function PostStory() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [genres, setGenres] = useState([]); // Khởi tạo genres là mảng rỗng
  const [status, setStatus] = useState("");
  const [agree, setAgree] = useState(false);

  // Dữ liệu thể loại cho mỗi danh mục
  const categoryData = {
    "Văn học Việt Nam": [
      { name: "Truyện ngắn", path: "./truyen-ngan" },
      { name: "Lãng mạn", path: "./lang-man" },
      { name: "Kinh dị", path: "./kinh-di" },
      { name: "Giả tưởng", path: "./gia-tuong" },
      { name: "Hồi ký", path: "./hoi-ky" },
      { name: "Phiêu lưu", path: "./phieu-luu" },
    ],
    "Văn học nước ngoài": [
      { name: "Truyện ngắn", path: "./truyen-ngan" },
      { name: "Lãng mạn", path: "./lang-man" },
      { name: "Kinh dị", path: "./kinh-di" },
      { name: "Giả tưởng", path: "./gia-tuong" },
      { name: "Hồi ký", path: "./hoi-ky" },
      { name: "Phiêu lưu", path: "./phieu-luu" },
    ],
    "Tiểu thuyết": [
      { name: "Ngôn tình", path: "./ngon-tinh" },
      { name: "Đam mỹ", path: "./dam-my" },
      { name: "Xuyên không", path: "./xuyen-khong" },
      { name: "Hệ thống", path: "./he-thong" },
      { name: "Điền văn", path: "./dien-van" },
      { name: "Ngọt sủng", path: "./ngot-sung" },
      { name: "Linh dị", path: "./linh-di" },
      { name: "Nữ phụ", path: "./nu-phu" },
      { name: "Thế thân", path: "./the-than" },
      { name: "Dân quốc", path: "./dan-quoc" },
      { name: "OE", path: "./oe" },
      { name: "Đô thị", path: "./do-thi" },
      { name: "HE", path: "./he" },
      { name: "SE", path: "./se" },
      { name: "Nữ cường", path: "./nu-cuong" },
      { name: "Bách hợp", path: "./bach-hop" },
      { name: "Trọng sinh", path: "./trong-sinh" },
      { name: "Ngược", path: "./nguoc" },
      { name: "Cung đấu", path: "./cung-dau" },
      { name: "Hài hước", path: "./hai-huoc" },
      { name: "TXVT", path: "./txvt" },
      { name: "Vả mặt", path: "./va-mat" },
      { name: "Chữa lành", path: "./chua-lanh" },
      { name: "Mạt thế", path: "./mat-the" },
      { name: "Huyền huyễn", path: "./huyen-huyen" },
      { name: "Truyện teen", path: "./truyen-teen" },
      { name: "Cổ đại", path: "./co-dai" },
      { name: "Hiện đại", path: "./hien-dai" },
      { name: "Báo thù", path: "./bao-thu" },
    ],
  };

  // Xử lý khi chọn danh mục
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setGenres([]); // Reset genres khi thay đổi danh mục
  };

  // Xử lý khi chọn thể loại
  const handleGenreChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
  
    // Kiểm tra genres có phải là mảng không, nếu không thì khởi tạo lại
    setGenres((prevGenres) => {
      if (!Array.isArray(prevGenres)) {
        return [value]; // Nếu genres không phải là mảng, khởi tạo thành mảng chứa giá trị
      }
  
      if (checked) {
        return [...prevGenres, value]; // Thêm thể loại mới vào genres
      } else {
        return prevGenres.filter((genre) => genre !== value); // Loại bỏ thể loại đã bỏ chọn
      }
    });
  };
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);  // Lưu file ảnh
  };

  const handleSubmit = () => {
    if (agree) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("coverImage", coverImage); // Gửi ảnh dưới dạng file
      formData.append("description", description);
      formData.append("category", category);
      formData.append("genres", JSON.stringify(genres)); // Gửi genres là mảng
      formData.append("status", status);

      // Gửi API với axios (lưu ý tùy chỉnh đường dẫn API)
      axios.post("http://localhost:8000/api/stories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(response => {
        console.log("Truyện đã được đăng thành công!", response);
        alert("Truyện đã được đăng thành công!");
      })
      .catch(error => {
        console.error("Có lỗi xảy ra khi đăng truyện!", error);
        alert("Có lỗi xảy ra khi đăng truyện!");
      });
    } else {
      alert("Bạn phải đồng ý với quy định của trang web.");
    }
  };

  return (
    <div className="post-story-container">
      <h1 className="post-story-title">ĐĂNG TRUYỆN</h1>

      <div className="form-group">
        <label>Tiêu đề</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập tiêu đề"
        />
      </div>

      <div className="form-group">
        <label>Thêm ảnh bìa</label>
        <div className="image-upload">
          {coverImage ? (
            <img src={URL.createObjectURL(coverImage)} alt="Cover" className="cover-preview" />
          ) : (
            <div className="placeholder">Thêm ảnh bìa</div>
          )}
          <input type="file" onChange={handleImageUpload} />
        </div>
      </div>

      <div className="form-group">
        <label>Tác giả</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Nhập tên tác giả"
        />
      </div>

      <div className="form-group">
        <label>Giới thiệu</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Nhập giới thiệu về truyện"
        ></textarea>
      </div>

      <div className="form-group">
        <label>Danh mục</label>
        <select value={category} onChange={handleCategoryChange}>
          <option value="">Chọn danh mục</option>
          <option value="Văn học Việt Nam">Văn học Việt Nam</option>
          <option value="Văn học nước ngoài">Văn học nước ngoài</option>
          <option value="Tiểu thuyết">Tiểu thuyết</option>
        </select>
      </div>

      {category && (
        <div className="form-group">
        <label>Thể loại</label>
        <div className="checkbox-container">
          {categoryData[category] && Array.isArray(categoryData[category]) ? (
            categoryData[category].map((item, index) => (
              <div key={index} className="checkbox-item">
                <input
                  type="checkbox"
                  id={item.path}
                  value={item.path}
                  checked={genres.includes(item.path)}
                  onChange={handleGenreChange}
                />
                <label htmlFor={item.path}>{item.name}</label>
              </div>
            ))
          ) : (
            <p>No genres available for this category.</p>  // Thông báo khi không có thể loại
          )}
        </div>
      </div>
      
      )}

      <div className="form-group">
        <label>Tình trạng</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Chọn tình trạng</option>
          <option value="Đang viết">Đang viết</option>
          <option value="Đã hoàn thành">Đã hoàn thành</option>
        </select>
      </div>

      <div className="form-group">
        <label>Thêm chương mới</label>
        <div className="add-chapter-container">
          <Link to={`/addChapter`}>
            <button className="add-chapter-button">+</button>
          </Link>
        </div>
      </div>

      <div className="form-group agreement">
        <div className="agreement-box">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <label>Tôi đồng ý với quy định đăng truyện của trang web</label>
        </div>
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        LƯU
      </button>
    </div>
  );
}

export default PostStory;
