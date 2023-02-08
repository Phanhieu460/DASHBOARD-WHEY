import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  updateProduct,
} from "./../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { Editor } from "@tinymce/tinymce-react";
import { Select } from "antd";
const { Option } = Select;
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { productId } = props;

  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [discount, setDiscount] = useState("");
  const [salePrice, setSalePrice] = useState(0);
  const [entryPrice, setEntryPrice] = useState(0);
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [tag, setTag] = useState([]);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState([]);
  const [latestProduct, setLatestProduct] = useState(false);
  const [size, setSize] = useState([]);
  const [smell, setSmell] = useState([]);

  const typeProduct = [
    { name: "Nhóm WheyProtein", value: "wheyprotein" },
    { name: "Nhóm Pre-Workout", value: "preworkout" },
    { name: "Nhóm Tăng Cân", value: "weightgain" },
    { name: "Nhóm Amino Axit, Creatin", value: "aminoaxit" },
    { name: "Nhóm Vitamin Và Khoáng Chất", value: "vitamin" },
    { name: "Nhóm Phụ Kiện", value: "accessory" },
  ];

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Sửa sản phẩm thành công!", ToastObjects);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(editProduct(productId));
      } else {
        setName(product.name);
        setShortDescription(product.shortDescription);
        setFullDescription(product.fullDescription);
        setStock(product.stock);
        setImage(product.image);
        setSalePrice(product.salePrice);
        setEntryPrice(product.entryPrice);
        setCategory(product.category);
        setDiscount(product.discount);
        setLatestProduct(product.latestProduct);
      }
    }
  }, [product, dispatch, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        category,
        discount,
        salePrice,
        entryPrice,
        image,
        shortDescription,
        fullDescription,
        stock,
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Quay Lại
            </Link>
            <h2 className="content-title">Sửa Thông Tin Sản Phẩm</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Lưu
              </button>
            </div>
          </div>

          <div className="row mb-4 justify-content-center">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Tên sản phẩm
                        </label>
                        <input
                          type="text"
                          placeholder="Vui lòng nhập vào đây"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="category" className="form-label">
                          Loại Sản Phẩm
                        </label>
                        <Select
                          name="category"
                          value={category}
                          onChange={(e) => setCategory(e)}
                          style={{
                            float: "left",
                            width: "100%",
                          }}
                        >
                          {typeProduct.map((item, index) => {
                            return (
                              <Option value={item.value}>{item.name}</Option>
                            );
                          })}
                        </Select>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="discount" className="form-label">
                          Giảm Giá
                        </label>
                        <input
                          type="text"
                          placeholder="Vui lòng nhập vào đây"
                          className="form-control"
                          id="discount"
                          required
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="product_sale_price"
                          className="form-label"
                        >
                          Giá Nhập
                        </label>
                        <input
                          type="number"
                          placeholder="Vui lòng nhập vào đây"
                          className="form-control"
                          id="product_sale_price"
                          required
                          value={salePrice}
                          onChange={(e) => setSalePrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="product_entry_price"
                          className="form-label"
                        >
                          Giá Bán
                        </label>
                        <input
                          type="number"
                          placeholder="Vui lòng nhập vào đây"
                          className="form-control"
                          id="product_entry_price"
                          required
                          value={entryPrice}
                          onChange={(e) => setEntryPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="stock" className="form-label">
                          Số Lượng
                        </label>
                        <input
                          type="text"
                          placeholder="Vui lòng nhập vào đây"
                          className="form-control"
                          id="stock"
                          required
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Mô tả ngắn</label>

                        <Editor
                          name="shortDescriptionProduct"
                          init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                              "advlist autolink lists link image charmap print preview anchor",
                              "searchreplace visualblocks code fullscreen",
                              "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                              "undo redo | formatselect | " +
                              "bold italic backcolor | alignleft aligncenter " +
                              "alignright alignjustify | bullist numlist outdent indent | " +
                              "removeformat | help",
                            content_style:
                              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                          }}
                          value={shortDescription}
                          onEditorChange={(content) => {
                            setShortDescription(content);
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Mô tả</label>
                        <Editor
                          name="fullDescriptionProduct"
                          init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                              "advlist autolink lists link image charmap print preview anchor",
                              "searchreplace visualblocks code fullscreen",
                              "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                              "undo redo | formatselect | " +
                              "bold italic backcolor | alignleft aligncenter " +
                              "alignright alignjustify | bullist numlist outdent indent | " +
                              "removeformat | help",
                            content_style:
                              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                          }}
                          value={fullDescription}
                          onEditorChange={(content) => {
                            setFullDescription(content);
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Hình ảnh</label>
                        <textarea
                          placeholder="Enter Image URL"
                          className="form-control"
                          rows="7"
                          value={image}
                          required
                          onChange={(e) => setImage(e.target.value)}
                        ></textarea>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
