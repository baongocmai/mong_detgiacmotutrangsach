import React, { useState } from "react";
import "./BooksManagement.css";
import booksIcon from "./books.png";
import categoriesIcon from "./categories.png";
import genresIcon from "./genres.png";
import bgImage from "./bg.png"; 
import Books from "./Books"
import Categories from "./Categories"
import Genres from "./Genres"


const BooksManagement = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [content, setContent] = useState(
    // Hình ảnh mặc định hiển thị ban đầu
    <div className="image-container">
      <img src={bgImage} alt="Default Background" />
    </div>
  );
  const handleIconClick = (type) => {
    setActiveButton(type);
  };

  const handleButtonClick = (type) => {
    if (type === "books") {
      setContent(<div className="content-text"><Books /></div>);
    } else if (type === "categories") {
      setContent(<div className="content-text"><Categories /></div>);
    } else if (type === "genres") {
      setContent(<div className="content-text"><Genres /></div>);
    } else {
      // Ensure the image is displayed
      setContent(
        <div className="image-container">
          <img src={bgImage} alt="Background" />
        </div>
      );
    }
  };

  return (
    <div className="management">
      <h1>Books Management</h1>
      <div className="icons-container">
        <div className="icon" onClick={() => handleIconClick("books")}>
          <img src={booksIcon} alt="Books" />
        </div>
        <div className="icon" onClick={() => handleIconClick("categories")}>
          <img src={categoriesIcon} alt="Categories" />
        </div>
        <div className="icon" onClick={() => handleIconClick("genres")}>
          <img src={genresIcon} alt="Genres" />
        </div>
      </div>

      {activeButton === "books" && (
        <button className ="books-button" type="submit" onClick={() => handleButtonClick("books")}>
          Books Content
        </button>
      )}
      {activeButton === "categories" && (
        <button className ="books-button" type="submit" onClick={() => handleButtonClick("categories")}>
          Categories Content
        </button>
      )}
      {activeButton === "genres" && (
        <button className ="books-button" type="submit" onClick={() => handleButtonClick("genres")}>
          Genres Content
        </button>
      )}

      <div className="rendered-content">{content}</div>
    </div>
  );
};

export default BooksManagement;
