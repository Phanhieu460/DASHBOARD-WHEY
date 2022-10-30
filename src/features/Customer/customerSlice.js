import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { openNotification } from "../../util/notification";
import customerService from "./customerService";

const userLogin = JSON.parse(localStorage.getItem("admin"));
const initialState = {
  customers: [],
  customer: [],
  message: "",
  isSuccess: false,
  isError: false,
};

export const createCustomer = createAsyncThunk(
  "customer/create",
  async (data, thunkAPI) => {
    try {
      const token = userLogin.accessToken;
      const response = await customerService.createCustomer(data, token);
      if (response.success) {
        openNotification("success", "Success", response.message);
        return response;
      } else {
        openNotification("error", "Error", response.message);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateCustomer = createAsyncThunk(
  "customer/update",
  async (data, thunkAPI) => {
    try {
      const token = userLogin.accessToken;
      const response = await customerService.updateCustomer(
        data,
        token,
        data.params.id
      );
      if (response) {
        openNotification("success", "Success", response.message);
        return response;
      } else {
        openNotification("error", "Error", response.message);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getCustomer = createAsyncThunk(
  "customer/getAll",
  async (_, thunkAPI) => {
    try {
      const token = userLogin.accessToken;
      return await customerService.getCustomer(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getCustomerById = createAsyncThunk(
  "product/getCustomerById",
  async (id, thunkAPI) => {
    try {
      const token = userLogin.accessToken;
      return await customerService.getCustomerById(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteCustomer = createAsyncThunk(
  "customer/delete",
  async (id, thunkAPI) => {
    try {
      const token = userLogin.accessToken;
      const response = await customerService.deleteCustomer(id, token);
      if (response.success) {
        openNotification("success", "Success", response.message);
        return response;
      } else {
        openNotification("error", "Error", response.message);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.customers = null;
      })
      .addCase(getCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.customers = null;
      })
      .addCase(getCustomerById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customer = action.payload;
      })
      .addCase(getCustomerById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.customer = null;
      })
      .addCase(updateCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.customers = null;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.customers = null;
      });
  },
});

export const { reset } = customerSlice.actions;
export default customerSlice.reducer;
