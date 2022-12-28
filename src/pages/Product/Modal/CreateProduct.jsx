import React, { useState } from "react";
import {
  Modal,
  Form,
  Button,
  Input,
  Select,
  Col,
  Row,
  Switch,
  Card,
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch } from "react-redux";
import {
  createProduct,
  getProduct,
} from "../../../features/Product/productSlice";

const { Option } = Select;
const { TextArea } = Input;

const CreateProduct = () => {
  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [discount, setDiscount] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
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

  const handleClick = () => {
    // const sizes = size.split(",").map((item) => {
    //   return { size: item };
    // });
    // const smells = smell.split(",").map((item) => {
    //   return {
    //     name: item,
    //     stock: stock,
    //   };
    // });

    const variations = smell.split(",").map((item) => {
      return {
        smell: item,
        size: size.split(",").map((item) => {
          return {
            name: item,
            stock: stock,
          };
        }),
      };
    });

    console.log(variations, "variations");
    const data = {
      name,
      category,
      shortDescription,
      fullDescription,
      salePrice,
      entryPrice,
      stock,
      tag,
      variation: variations,
      image: image.split(","),
      latestProduct,
    };
    dispatch(createProduct(data));
    dispatch(getProduct());
    setIsOpenModal(false);
    form.resetFields();
  };
  return (
    <div>
      <div
        style={{ fontSize: 18, fontWeight: 700, padding: 24, float: "right" }}
      >
        <Button onClick={() => setIsOpenModal(true)}>Thêm Sản Phẩm</Button>
      </div>
      <Modal
        style={{ top: "50px" }}
        width={700}
        title="Sản Phẩm"
        visible={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        footer={false}
      >
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
                rules={[{ required: true }]}
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
                    return <Option value={item.value}>{item.name}</Option>;
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
              <Form.Item
                label="Sản Phẩm Mới"
                name="latestProduct"
                rules={[{ required: true }]}
              >
                <Switch
                  checked={latestProduct}
                  onChange={() => setLatestProduct(!latestProduct)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Giảm Giá"
                name="discount"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  name="text"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <div style={{ border: "1px solid #dcdcdc", padding: "12px 24px" }}>
            <p style={{ fontWeight: "bold", fontSize: 16 }}>
              <span style={{ color: "red", paddingRight: 5 }}>*</span>Phân Loại
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={12}>
                <Form.Item
                  label="Kích Thước"
                  name="size"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <TextArea
                    rows={4}
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Hương Vị"
                  name="smell"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <TextArea
                    rows={4}
                    value={smell}
                    onChange={(e) => setSmell(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item
                label="Hình ảnh"
                name="image"
                rules={[
                  {
                    required: true,
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
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Editor
                  name="shortDescriptionProduct"
                  init={{
                    height: 150,
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
                  },
                ]}
              >
                <Editor
                  name="fullDescriptionProduct"
                  init={{
                    height: 150,
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

          <Button
            key="submit"
            type="primary"
            // disabled={title && issueType && status ? false : true}
            onClick={handleClick}
          >
            Thêm
          </Button>
          <Button key="back" onClick={() => setIsOpenModal(false)}>
            Hủy Bỏ
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateProduct;
