import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { openNotification } from "../../util/notification";
import authService from "./authService";

// Get admin from localStorage
const admin = JSON.parse(localStorage.getItem("admin"));

const initialState = {
  admins: [],
  admin: admin ? admin : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register admin
export const register = createAsyncThunk(
  "auth/register",
  async (admin, thunkAPI) => {
    try {
      const response = await authService.register(admin);
      // if (response.success) {
      //   openNotification("success", "Success", response.message);
      //   return response;
      // } else {
      //   openNotification("error", "Error", response.message);
      // }
      return response;
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

// Login admin
export const login = createAsyncThunk("auth/login", async (admin, thunkAPI) => {
  try {
    const response = await authService.login(admin);
    // if (response.success) {
    //   openNotification("success", "Success", response.message);
    //   return response;
    // } else {
    //   openNotification("error", "Error", response.message);
    // }
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const updateAdmin = createAsyncThunk(
  "admin/update",
  async (dataUpdate, thunkAPI) => {
    try {
      const response = await authService.updateadmin(dataUpdate, dataUpdate.id);
      // if (response.success) {
      //   openNotification("success", "Success", response.message);
      //   return response;
      // } else {
      //   openNotification("error", "Error", response.message);
      // }
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.admin = action.payload;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.admin = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.admin = action.payload;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.admin = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.admin = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.admin = null;
        state.isSuccess = false;
      })
      .addCase(updateAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
        state.message = action.payload.message;
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.admin = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
