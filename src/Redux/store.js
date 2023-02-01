import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./Reducers/userReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productListReducer,
  productUpdateReducer,
} from "./Reducers/ProductReducers";
import {
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer,
} from "./Reducers/OrderReducres";
import {
  blogCreateReducer,
  blogDeleteReducer,
  blogEditReducer,
  blogListReducer,
  blogUpdateReducer,
} from "./Reducers/BlogReducers";
import {
  customerCreateReducer,
  customerDeleteReducer,
  customerEditReducer,
  customerListReducer,
  customerUpdateReducer,
} from "./Reducers/CustomerReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderDeliver: orderDeliveredReducer,
  blogList: blogListReducer,
  blogDelete: blogDeleteReducer,
  blogCreate: blogCreateReducer,
  blogEdit: blogEditReducer,
  blogUpdate: blogUpdateReducer,
  customerList: customerListReducer,
  customerCreate: customerCreateReducer,
  customerUpdate: customerUpdateReducer,
  customerDelete: customerDeleteReducer,
  customerEdit: customerEditReducer,
});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
