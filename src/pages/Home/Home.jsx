import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/SideBar/SideBar";
import Widget from "../../components/Widget/Widget";

const Home = () => {
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ flex: 6 }}>
        <Navbar />
        <div style={{display: "flex", padding: 20, gap:20}}>
          <Widget type="user"/>
          <Widget type="order"/>
        </div>
      </div>
    </div>
  );
};

export default Home;
