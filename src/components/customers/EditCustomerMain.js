import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BLOG_UPDATE_RESET } from "../../Redux/Constants/BlogConstants";
import {
  createBlog,
  editBlog,
  updateBlog,
} from "./../../Redux/Actions/BlogActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import {
  editCustomer,
  updateCustomer,
} from "../../Redux/Actions/CustomerActions";
import { Radio, Select } from "antd";
import { CUSTOMER_UPDATE_RESET } from "../../Redux/Constants/CustomerConstants";

const { Option } = Select;

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditCustomerMain = (props) => {
  const { customerId } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [numberOfPurchase, setNumberOfPurchase] = useState("");
  const [customerType, setCustomerType] = useState("");

  const dispatch = useDispatch();

  const customerEdit = useSelector((state) => state.customerEdit);
  const { loading, error, customer } = customerEdit;

  const customerUpdate = useSelector((state) => state.customerUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = customerUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CUSTOMER_UPDATE_RESET });
      toast.success("Sửa sản phẩm thành công!", ToastObjects);
    } else {
      if (!customer.name || customer._id !== customerId) {
        dispatch(editCustomer(customerId));
      } else {
        setName(customer.name);
        setEmail(customer.email);
        setPhone(customer.phone);
        setAddress(customer.address);
        setGender(customer.gender);
        setNumberOfPurchase(customer.numberOfPurchase);
        setCustomerType(customer.customerType);
      }
    }
  }, [customer, dispatch, customerId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCustomer({
        _id: customerId,
        name,
        email,
        phone,
        address,
        gender,
        numberOfPurchase,
        customerType,
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/customers" className="btn btn-danger text-white">
              Quay Lại
            </Link>
            <h2 className="content-title">Sửa Thông Tin Khách Hàng</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Lưu
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <>
                    <div className="mb-4">
                      <label htmlFor="customer_title" className="form-label">
                        Tên khách hàng
                      </label>
                      <input
                        type="text"
                        placeholder="Vui lòng nhập vào đây"
                        className="form-control"
                        id="customer_title"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Giới Tính</label>
                      <Radio.Group
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                        className="form-control"
                      >
                        <Radio value="Nam">Nam</Radio>
                        <Radio value="Nữ">Nữ</Radio>
                      </Radio.Group>
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        placeholder="Vui lòng nhập vào đây"
                        className="form-control"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Số Điện Thoại</label>
                      <input
                        type="text"
                        placeholder="Vui lòng nhập vào đây"
                        className="form-control"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Địa Chỉ</label>
                      <input
                        type="text"
                        placeholder="Vui lòng nhập vào đây"
                        className="form-control"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Loại Khách Hàng</label>
                      <Select
                        name="customerType"
                        value={customerType}
                        onChange={(e) => setCustomerType(e)}
                        style={{
                          float: "left",
                          width: "100%",
                        }}
                      >
                        <Option value="VIP">VIP</Option>
                        <Option value="Member">Member</Option>
                      </Select>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditCustomerMain;
