import React from "react";
import Header from "../../components/Header";
import PostStory from "../../components/PostStory/PostStory";
import "../../../../App.css";

const PostStoryPage = () => {
    return (
        <div className="App">
          <Header />
          <PostStory/>
        </div>
    );
};

export default PostStoryPage;
