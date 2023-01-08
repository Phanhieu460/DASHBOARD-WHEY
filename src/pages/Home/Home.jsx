import React from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/Header";
import Main from "../../components/Home/Main";

const Home = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Main />
      </main>
    </>
  );
};

export default Home;
