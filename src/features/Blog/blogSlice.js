import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { openNotification } from "../../util/notification";
import blogService from "./blogService";

const userLogin = JSON.parse(localStorage.getItem('admin'))
const initialState = {
    blogs: [],
    blog: [],
    message: '',
    isSuccess: false,
    isError: false
}

export const createBlog = createAsyncThunk('blog/create',async (blogData, thunkAPI) => {
    try {
        const token = userLogin.accessToken;
        const response = await blogService.createBlog(blogData, token)
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
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
})
export const updateBlog = createAsyncThunk('blog/update', async (blogData,thunkAPI) => {
  try {
    const token = userLogin.accessToken;
    const response = await blogService.updateBlog(blogData, token, blogData.params.id)
    if (response) {
      openNotification('success', 'Success', response.message)
      return response
    } else {
      openNotification("error", "Error", response.message);
    }
  } catch (error) {
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString()

  return thunkAPI.rejectWithValue(message)
  }
})
export const getBlog = createAsyncThunk(
    'blog/getAllBlog',
    async (_, thunkAPI) => {
      try {
        const token = userLogin.accessToken;
        return await blogService.getBlog(token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )
  export const getBlogById = createAsyncThunk(
    'product/getBlogById',
    async (id, thunkAPI) => {
      try {
        const token = userLogin.accessToken;
        return await blogService.getBlogById(id,token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )
  export const deleteBlog = createAsyncThunk(
    "blog/delete",
    async (id, thunkAPI) => {
      try {
        const token = userLogin.accessToken;
        const response = await blogService.deleteBlog(id, token);
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

  export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(createBlog.pending, (state) => {
          state.isLoading = true
        })
        .addCase(createBlog.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.blogs =action.payload
        })
        .addCase(createBlog.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.blogs = null
        })
        .addCase(getBlog.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getBlog.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.blogs = action.payload
        })
        .addCase(getBlog.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.blogs = null

        }).addCase(getBlogById.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getBlogById.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.blog = action.payload
        })
        .addCase(getBlogById.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.blog = null

        })
        .addCase(updateBlog.pending, (state) => {
          state.isLoading = true
        })
        .addCase(updateBlog.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.blogs = action.payload
        })
        .addCase(updateBlog.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.blogs = null

        })
        .addCase(deleteBlog.pending, (state) => {
          state.isLoading = true
        })
        .addCase(deleteBlog.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.blogs = action.payload
        })
        .addCase(deleteBlog.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.blogs = null
        })
    },
  })
  
  export const { reset } = blogSlice.actions
  export default blogSlice.reducer