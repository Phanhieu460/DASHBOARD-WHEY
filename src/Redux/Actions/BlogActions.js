import {
  BLOG_CREATE_FAIL,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
  BLOG_EDIT_FAIL,
  BLOG_EDIT_REQUEST,
  BLOG_EDIT_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_UPDATE_FAIL,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_SUCCESS,
} from "../Constants/BlogConstants";
import axios from "axios";
import { logout } from "./userActions";

export const listBlogs = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/blogs/all`, config);

    dispatch({ type: BLOG_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BLOG_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE BLOG
export const deleteBlog = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/blogs/${id}`, config);

    dispatch({ type: BLOG_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BLOG_DELETE_FAIL,
      payload: message,
    });
  }
};

// CREATE BLOG
export const createBlog =
  (name, description, image, writer) => async (dispatch, getState) => {
    try {
      dispatch({ type: BLOG_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      console.log(name, description);
      const { data } = await axios.post(
        `/api/blogs/`,
        {
          name,
          description,
          image,
          writer,
        },
        config
      );

      dispatch({ type: BLOG_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: BLOG_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT BLOG
export const editBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_EDIT_REQUEST });
    const { data } = await axios.get(`/api/blogs/${id}`);
    dispatch({ type: BLOG_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BLOG_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE BLOG
export const updateBlog = (blog) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/blogs/${blog._id}`, blog, config);

    dispatch({ type: BLOG_UPDATE_SUCCESS, payload: data });
    dispatch({ type: BLOG_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BLOG_UPDATE_FAIL,
      payload: message,
    });
  }
};
