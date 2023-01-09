import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "./../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { Form, Input, Select, Col, Row, Switch } from "antd";
import { Editor } from "@tinymce/tinymce-react";

const { Option } = Select;
const { TextArea } = Input;

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
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

  const [form] = Form.useForm();

  const typeProduct = [
    { name: "Nhóm WheyProtein", value: "wheyprotein" },
    { name: "Nhóm Pre-Workout", value: "preworkout" },
    { name: "Nhóm Tăng Cân", value: "weightgain" },
    { name: "Nhóm Amino Axit, Creatin", value: "aminoaxit" },
    { name: "Nhóm Vitamin Và Khoáng Chất", value: "vitamin" },
    { name: "Nhóm Phụ Kiện", value: "accessory" },
  ];

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  useEffect(() => {
    if (product) {
      toast.success("Thêm sản phẩm thành công", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setShortDescription("");
      setFullDescription("");
      setStock(0);
      setImage([]);
      setSalePrice(0);
      setEntryPrice(0);
      setCategory([]);
      setDiscount("");
      setLatestProduct(false);
    }
  }, [product, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct(
        name,
        category,
        discount,
        salePrice,
        entryPrice,
        image.split(","),
        shortDescription,
        fullDescription,
        stock
      )
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
            <h2 className="content-title">Thêm Sản Phẩm</h2>
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

                  <Form
                    form={form}
                    name="basic"
                    labelCol={{
                      span: 24,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    autoComplete="off"
                  >
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                      <Col span={24}>
                        <Form.Item
                          label="Tên Sản Phẩm"
                          name="name"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không bỏ trống ô này!",
                            },
                          ]}
                        >
                          <Input
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                      <Col span={12}>
                        <Form.Item
                          label="Loại Sản Phẩm"
                          name="category"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không bỏ trống ô này!",
                            },
                          ]}
                        >
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
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Số Lượng"
                          name="stock"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không bỏ trống ô này!",
                            },
                          ]}
                        >
                          <Input
                            name="text"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                      <Col span={12}>
                        <Form.Item
                          label="Giá Nhập"
                          name="salePrice"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không bỏ trống ô này!",
                            },
                          ]}
                        >
                          <Input
                            name="text"
                            value={salePrice}
                            onChange={(e) => setSalePrice(e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Giá Bán"
                          name="entryPrice"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không bỏ trống ô này!",
                            },
                          ]}
                        >
                          <Input
                            name="text"
                            value={entryPrice}
                            onChange={(e) => setEntryPrice(e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                      <Col span={12}>
                        <Form.Item label="Sản Phẩm Mới" name="latestProduct">
                          <Switch
                            checked={latestProduct}
                            onChange={() => setLatestProduct(!latestProduct)}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Giảm Giá" name="discount">
                          <Input
                            name="text"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    {/* <div
                      style={{
                        border: "1px solid #dcdcdc",
                        padding: "12px 24px",
                      }}
                    >
                      <p style={{ fontWeight: "bold", fontSize: 16 }}>
                        <span style={{ color: "red", paddingRight: 5 }}>*</span>
                        Phân Loại
                      </p>
                      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={12}>
                          <Form.Item label="Kích Thước" name="size">
                            <TextArea
                              rows={4}
                              value={size}
                              onChange={(e) => setSize(e.target.value)}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Hương Vị" name="smell">
                            <TextArea
                              rows={4}
                              value={smell}
                              onChange={(e) => setSmell(e.target.value)}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div> */}
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                      <Col span={24}>
                        <Form.Item
                          label="Hình ảnh"
                          name="image"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không bỏ trống ô này!",
                            },
                          ]}
                        >
                          <TextArea
                            rows={4}
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          label="Mô tả ngắn"
                          name="shortDescriptionProduct"
                        >
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
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          label="Mô tả"
                          name="fullDescriptionProduct"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng không bỏ trống ô này!",
                            },
                          ]}
                        >
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
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
