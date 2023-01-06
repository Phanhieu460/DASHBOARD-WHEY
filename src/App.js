import { Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog/Blog";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Product from "./pages/Product/Product";
import SignUp from "./pages/SignUp/SignUp";
import Customer from "./pages/Customer/Customer";
import { useSelector } from "react-redux";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/product" element={<Product />}></Route>
      <Route path="/customer" element={<Customer />} />
    </Routes>
  );
}

export default App;
