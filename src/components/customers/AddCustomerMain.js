import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { Editor } from "@tinymce/tinymce-react";
import { CUSTOMER_CREATE_RESET } from "../../Redux/Constants/CustomerConstants";
import { createCustomer } from "../../Redux/Actions/CustomerActions";
import { Radio, Select } from "antd";

const { Option } = Select;
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const AddCustomerMain = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [numberOfPurchase, setNumberOfPurchase] = useState("");
  const [customerType, setCustomerType] = useState("");

  const dispatch = useDispatch();

  const customerCreate = useSelector((state) => state.customerCreate);
  const { loading, error, customer } = customerCreate;

  useEffect(() => {
    if (customer) {
      toast.success("Thêm khách hàng thành công", ToastObjects);
      dispatch({ type: CUSTOMER_CREATE_RESET });
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setGender("");
      setNumberOfPurchase("");
      setCustomerType("");
    }
  }, [customer, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createCustomer(
        name,
        gender,
        phone,
        email,
        address,
        numberOfPurchase,
        customerType
      )
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
            <h2 className="content-title">Thêm Khách Hàng</h2>
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

export default AddCustomerMain;
