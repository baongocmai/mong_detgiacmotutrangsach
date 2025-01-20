import React from "react";
import Header from "../../components/Header";
import MyFavouriteStories from "../../components/MyStories/MyFavouriteStorise";

const MyFavouriteStoriesPage = () => {
  return (
    <div className="header">
      <Header />
      <div className="my-stories">
        <MyFavouriteStories />
      </div>
    </div>
  );
};

export default MyFavouriteStoriesPage;
