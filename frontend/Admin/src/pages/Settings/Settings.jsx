import React from "react";
import './Settings.css';
import Banner from "../../components/Banner/Banner.jsx";
import ContactInfo from "../../components/ContactInfo/ContactInfo.jsx";
import WebsiteIntro from "../../components/WebsiteIntro/WebsiteIntro.jsx";
import Service from "../../components/Policy/Service.jsx";
import PrivacyPolicy from "../../components/Policy/PrivacyPolicy.jsx";

const Settings = () => {
  return (
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
  );
};

export default Settings;
