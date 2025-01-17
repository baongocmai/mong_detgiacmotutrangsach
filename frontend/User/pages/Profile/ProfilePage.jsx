import React from "react";
import Header from "./ViewProfile/Header";
import ViewProfile from "./ViewProfile/ViewProfile";
import "../../../../App.css";


const ViewProfilePage = () => {
    return (
        <div className="App">
          <Header />
          <ViewProfile/>
        </div>
    );
};

export default ViewProfilePage;
