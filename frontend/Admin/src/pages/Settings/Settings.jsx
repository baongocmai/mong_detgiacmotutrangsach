import React from "react";
import './Settings.css';
import Banner from "./Banner.jsx";
import ContactInfo from "./ContactInfo";
import WebsiteIntro from "./WebsiteIntro";
import Service from "./Service.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";

const Settings = () => {
  return (
    <div className="container">
      <h1>Settings</h1>

      <div className="blocks">
        <div className="wrapper">
          <Banner />
        </div>
        <div className="wrapper">
          <WebsiteIntro />
        </div>
        <div className="wrapper">
          <ContactInfo />
        </div>
        <div className="wrapper">
          <Service />
          <PrivacyPolicy />
        </div>
      </div>
    </div>

  );
};

export default Settings;
