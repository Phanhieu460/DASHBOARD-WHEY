import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/Auth/authSlice";
import productSlice from "../features/Product/productSlice"

export default configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice
    }
})