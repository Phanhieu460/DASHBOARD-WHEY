import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/Auth/authSlice";
import blogSlice from "../features/Blog/blogSlice";
import customerSlice from "../features/Customer/customerSlice";
import productSlice from "../features/Product/productSlice"

export default configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice,
        customer: customerSlice,
        blog: blogSlice
    }
})