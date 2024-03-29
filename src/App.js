import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import Blog from "./pages/Blog/Blog";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Product from "./pages/Product/Product";
import Register from "./pages/Register/Register";
import Customer from "./pages/Customer/Customer";
import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./Redux/Actions/ProductActions";
import { listOrders } from "./Redux/Actions/OrderActions";
import { useEffect } from "react";
import AddProduct from "./pages/Product/AddProduct";
import ProductEditScreen from "./pages/Product/ProductEditScreen";
import AddBlog from "./pages/Blog/AddBlog";
import BlogEditScreen from "./pages/Blog/BlogEditScreen";
import { listBlogs } from "./Redux/Actions/BlogActions";
import AddCustomer from "./pages/Customer/AddCusomer";
import CustomerEditScreen from "./pages/Customer/CustomerEditScreen";
import OrderScreen from "./pages/Order/OrderScreen";
import OrderDetailScreen from "./pages/Order/OrderDetailScreen";

function App() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
      dispatch(listBlogs());
      dispatch(listOrders());
    }
  }, [dispatch, userInfo]);
  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={Home} exact />
          <PrivateRouter path="/products" component={Product} />
          <PrivateRouter path="/customers" component={Customer} />
          <PrivateRouter path="/blogs" component={Blog} />
          <PrivateRouter path="/addproduct" component={AddProduct} />
          <PrivateRouter path="/addblog" component={AddBlog} />
          <PrivateRouter path="/addcustomer" component={AddCustomer} />
          <PrivateRouter path="/orders" component={OrderScreen} />
          <PrivateRouter path="/order/:id" component={OrderDetailScreen} />
          {/* <PrivateRouter path="/users" component={UsersScreen} /> */}

          <PrivateRouter
            path="/product/:id/edit"
            component={ProductEditScreen}
          />
          <PrivateRouter path="/blog/:id/edit" component={BlogEditScreen} />
          <PrivateRouter
            path="/customer/:id/edit"
            component={CustomerEditScreen}
          />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {/* <PrivateRouter path="*" component={NotFound} /> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
