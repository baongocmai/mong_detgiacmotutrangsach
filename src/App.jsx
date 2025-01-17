import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import User Pages
import HomePage from "./frontend/User/pages/HomePage";
import SearchResultPage from "./frontend/User/pages/SearchResultPage";
import HuongDanPage from "./frontend/User/pages/Rules/HuongDanPage";
import QuyDinhPage from "./frontend/User/pages/Rules/QuyDinhPage";
import LienHePage from "./frontend/User/pages/Rules/LienHePage";
import ViewProfilePage from "./frontend/User/pages/Profile/ProfilePage";
import MyStoriesPage from "./frontend/User/pages/MyStories/MyStoriesPage";
import CategoryTTPage from "./frontend/User/pages/Category/CategoryTTPage";
import CategoryVNPage from "./frontend/User/pages/Category/CategoryVNPage";
import NovelGenresPage from "./frontend/User/pages/Genres/NovelGenresPage";
import CategoryNNPage from "./frontend/User/pages/Category/CategoryNNPage";
import NNGenresPage from "./frontend/User/pages/Genres/NNGenresPage";
import VNGenresPage from "./frontend/User/pages/Genres/VNGenresPage";
import PostStoryPage from "./frontend/User/pages/Story/PostStoryPage";
import AddChapterPage from "./frontend/User/pages/Story/AddChapterPage";
import UpdateStoryPage from "./frontend/User/pages/Story/UpdateStoryPage";
import EditChapterPage from "./frontend/User/pages/Story/EditChapterPage";
import ReviewPage from "./frontend/User/pages/ReviewPage/ReviewPage";

// Import Admin Pages
import Layout from "./frontend/Admin/components/Layout/Layout";
import AdminManagement from "./frontend/Admin/pages/AdminManagement/AdminManagement";
import Dashboard from "./frontend/Admin/pages/Dashboard/Dashboard";
import Login from "./frontend/User/pages/Login/Login";
import Register from "./frontend/User/pages/Login/Register";
import OTP from "./frontend/User/pages/Login/OTP";
import Reset from "./frontend/User/pages/Login/Reset";
import Report from "./frontend/Admin/pages/Report/Report";
import Comments from "./frontend/Admin/pages/Comments/Comments";
import Banner from "./frontend/Admin/pages/Settings/Banner";
import Service from "./frontend/Admin/pages/Settings/Service";
import Settings from "./frontend/Admin/pages/Settings/Settings";
import StoriesManagement from "./frontend/Admin/pages/Stories/StoriesManagement";
import UsersManagement from "./frontend/Admin/pages/Users/UsersManagement";

// CSS
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/search-results" element={<SearchResultPage />} />
          <Route path="/guide" element={<HuongDanPage />} />
          <Route path="/quydinh" element={<QuyDinhPage />} />
          <Route path="/contact" element={<LienHePage />} />
          <Route path="/viewProfile" element={<ViewProfilePage />} />
          <Route path="/myStories" element={<MyStoriesPage />} />
          <Route path="/vanhocVN" element={<CategoryVNPage />} />
          <Route path="/vanhocNN" element={<CategoryNNPage />} />
          <Route path="/novel" element={<CategoryTTPage />} />
          <Route path="/novel/:tag" element={<NovelGenresPage />} />
          <Route path="/vanhocVn/:tag" element={<VNGenresPage />} />
          <Route path="/vanhocnn/:tag" element={<NNGenresPage />} />
          <Route path="/postStory" element={<PostStoryPage />} />
          <Route path="/addChapter" element={<AddChapterPage />} />
          <Route path="/editStories" element={<UpdateStoryPage />} />
          <Route path="/editChapter" element={<EditChapterPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/otp" element={<OTP />} />

          {/* Admin Routes */}
          <Route element={<Layout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/report" element={<Report />} />
            <Route path="/admin/comments" element={<Comments />} />
            <Route path="/admin/stories" element={<StoriesManagement />} />
            <Route path="/admin/users" element={<UsersManagement />} />

            <Route path="/admin/settings/banner" element={<Banner />} />
            <Route path="/admin/settings/service" element={<Service />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/management" element={<AdminManagement />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
