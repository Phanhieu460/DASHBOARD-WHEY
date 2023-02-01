import {
  CUSTOMER_CREATE_FAIL,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_SUCCESS,
  CUSTOMER_DELETE_FAIL,
  CUSTOMER_DELETE_REQUEST,
  CUSTOMER_DELETE_SUCCESS,
  CUSTOMER_EDIT_FAIL,
  CUSTOMER_EDIT_REQUEST,
  CUSTOMER_EDIT_SUCCESS,
  CUSTOMER_LIST_FAIL,
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_UPDATE_FAIL,
  CUSTOMER_UPDATE_REQUEST,
  CUSTOMER_UPDATE_SUCCESS,
} from "../Constants/CustomerConstants";
import axios from "axios";
import { logout } from "./userActions";
import { URL } from "../Url";

export const listCustomers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${URL}/api/customers/all`, config);

    dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CUSTOMER_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE BLOG
export const deleteCustomer = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${URL}/api/customers/${id}`, config);

    dispatch({ type: CUSTOMER_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CUSTOMER_DELETE_FAIL,
      payload: message,
    });
  }
};

// CREATE CUSTOMER
export const createCustomer =
  (name, gender, phone, email, address, numberOfPurchase, customerType) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CUSTOMER_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${URL}/api/customers/`,
        {
          name,
          gender,
          phone,
          email,
          address,
          numberOfPurchase,
          customerType,
        },
        config
      );

      dispatch({ type: CUSTOMER_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: CUSTOMER_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT CUSTOMER
export const editCustomer = (id) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_EDIT_REQUEST });
    const { data } = await axios.get(`${URL}/api/customers/${id}`);
    dispatch({ type: CUSTOMER_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CUSTOMER_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE CUSTOMER
export const updateCustomer = (customer) => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${URL}/api/customers/${customer._id}`,
      customer,
      config
    );

    dispatch({ type: CUSTOMER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: CUSTOMER_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CUSTOMER_UPDATE_FAIL,
      payload: message,
    });
  }
};
