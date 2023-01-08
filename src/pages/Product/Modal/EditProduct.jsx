import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Input, Select, Col, Row, Switch } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  getProduct,
  getProductById,
} from "../../../features/Product/productSlice";

const { Option } = Select;
const { TextArea } = Input;

const EditProduct = (props) => {
  const dispatch = useDispatch();

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

  const { product } = useSelector((state) => state.product);

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
    // const data = {
    //   name,
    //   type,
    //   description,
    //   salePrice,
    //   entryPrice,
    //   quantity,
    //   adminId,
    // };
    // dispatch(createProduct(data));
    // dispatch(getProduct());

    form.resetFields();
  };

  return (
    <div>
      <Modal
        style={{ top: "50px" }}
        width={700}
        title="Sản Phẩm"
        visible={props.open}
        onCancel={props.closeModal}
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
                rules={[
                  { required: true, message: "Vui lòng không bỏ trống ô này!" },
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
          <div style={{ border: "1px solid #dcdcdc", padding: "12px 24px" }}>
            <p style={{ fontWeight: "bold", fontSize: 16 }}>
              <span style={{ color: "red", paddingRight: 5 }}>*</span>Phân Loại
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
          </div>
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
              <Form.Item label="Mô tả ngắn" name="shortDescriptionProduct">
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
                    message: "Vui lòng không bỏ trống ô này!",
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
          <Row>
            <Col
              span={24}
              style={{
                textAlign: "right",
              }}
            >
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                disabled={name ? false : true}
                onClick={handleClick}
              >
                Sửa
              </Button>
              <Button
                key="back"
                style={{
                  margin: "0 8px",
                }}
                onClick={props.closeModal}
              >
                Hủy Bỏ
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default EditProduct;
