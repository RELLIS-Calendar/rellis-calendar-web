import React, { useState } from "react";
import Carousel from "./Carousel/Carousel";
import Eventgallery from "./Eventgallery/Eventgallery";
import Footer from "../../Components/Footer/Footer";
import Searchbar from "./Search/Searchbar";
import "./Home.css";

function Home() {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="home-page">
      <Carousel />
      <Searchbar value={searchText} onChange={setSearchText} />
      <Eventgallery searchText={searchText} />
      <Footer />
    </div>
  );
}

export default Home;