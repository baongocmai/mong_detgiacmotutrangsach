import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BannerSlider from "./components/BannerSlider";
import NewBooks from "./components/NewBooks";
import FeaturedBooks from "./components/FeaturedBooks";
import "./App.css"; 

function App() {
    return (
        <div className="App">
            <Header />
            <BannerSlider />
            <FeaturedBooks />
            <NewBooks />  
            <Footer />
        </div>
    );
}

export default App;
