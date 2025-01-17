import React, { useState } from "react";

function UpdateStory() {
  const [title, setTitle] = useState("Đảo mộng mơ");
  const [description, setDescription] = useState(
    "Đảo mộng mơ là một lát cắt đời sống của những đứa trẻ lớn lên..."
  );
  const [status, setStatus] = useState("Đang viết");
  const [categories, setCategories] = useState(["Văn học Việt Nam", "Tiểu thuyết"]);
  const [genres, setGenres] = useState(["Hài hước", "Phiêu lưu"]);
  const [chapters, setChapters] = useState([
    { id: 1, title: "Chương 01: A", date: "Ngày 1-1-2025" },
    { id: 2, title: "Chương 02: A", date: "Ngày 1-1-2025" },
  ]);

  const handleAddChapter = () => {
    const newChapter = {
      id: chapters.length + 1,
      title: `Chương ${chapters.length + 1}: Tên mới`,
      date: "Ngày X",
    };
    setChapters([...chapters, newChapter]);
  };

  return (
    <div className="edit-story-container">
  <h1>CHỈNH SỬA / {title}</h1>

  {/* Thông tin chính */}
  <div className="section-box">
    <label>Tiêu đề</label>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="title-input"
    />

    <h3>Giới thiệu</h3>
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Nhập giới thiệu về truyện..."
    ></textarea>
  </div>

  {/* Danh mục */}
  <div className="section-box">
    <h3>Danh mục</h3>
    <div className="tags">
      {categories.map((cat, index) => (
        <span key={index} className="tag">{cat}</span>
      ))}
    </div>
  </div>

  {/* Thể loại */}
  <div className="section-box">
    <h3>Thể loại</h3>
    <div className="tags">
      {genres.map((genre, index) => (
        <span key={index} className="tag">{genre}</span>
      ))}
    </div>
  </div>

  {/* Tình trạng */}
  <div className="section-box">
    <h3>Tình trạng</h3>
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="Đang viết">Đang viết</option>
      <option value="Đã hoàn thành">Đã hoàn thành</option>
    </select>
  </div>

  {/* Danh sách chương */}
  <div className="section-box chapter-list">
    <h3>Danh sách chương</h3>
    <ul>
      {chapters.map((chapter) => (
        <li key={chapter.id}>
          {chapter.title} - {chapter.date}
        </li>
      ))}
    </ul>
    <button onClick={handleAddChapter} className="add-chapter-btn">
      Thêm chương mới +
    </button>
  </div>
</div>

  );
}

export default UpdateStory;
