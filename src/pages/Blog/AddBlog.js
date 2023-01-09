import React from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/Header";
import AddBlogMain from "../../components/blogs/AddBlogMain";

const AddBlog = () => {
  return (
    <div>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddBlogMain />
      </main>
    </div>
  );
};

export default AddBlog;
