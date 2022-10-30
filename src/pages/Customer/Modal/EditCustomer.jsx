import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Input, Select, Col, Row, Avatar } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, getProduct, getProductById } from "../../../features/Product/productSlice";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const EditCustomer = ({data}) => {
const params = useParams()
  
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [isOpenModal, setIsOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [description, setDescription] = useState("");
  const [adminId, setAdminId] = useState("");
  const [quantity, setQuantity] = useState(0)

  const {product} = useSelector(state => state.product)

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getProductById(params.id))
  }, [product])

  const typeProduct = [
    { name: "Nhóm WheyProtein", value: "wheyprotein" },
    { name: "Nhóm Pre-Workout", value: "preworkout" },
    { name: "Nhóm Tăng Cân", value: "weightgain" },
    { name: "Nhóm Amino Axit, Creatin", value: "aminoaxit" },
    { name: "Nhóm Vitamin Và Khoáng Chất", value: "vitamin" },
    { name: "Nhoms Phụ Kiện", value: "accessory" },
  ];


  const handleClick = () =>{
    const data = {
        name,
        type,
        description,
        salePrice,
        entryPrice,
        quantity,
        adminId
      };
      dispatch(createProduct(data))
    dispatch(getProduct)
      setIsOpenModal(false);
      form.resetFields();
  }
  return (
    <div>
      <Button onClick={() => setIsOpenModal(true)}>Sửa</Button>
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
            <Col span={12}>
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
            <Col span={12}>
              <Form.Item
                label="Loại Sản Phẩm"
                name="type"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  name="type"
                  value={type}
                  onChange={(e) => setType(e)}
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
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Mô tả" name="descriptionProduct">
                <Editor
                  name="descriptionProduct"
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
                  value={description}
                  onEditorChange={(content) => {
                    setDescription(content);
                  }}
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
                label="Số Lượng"
                name="quantity"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  name="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Người Thêm"
                name="adminId"
                // rules={[
                //   {
                //     required: true,
                //   },
                // ]}
              >
                <Select
                  name="adminId"
                  value={adminId}
                  onChange={(e) => setAdminId(e)}
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
          </Row>
          <Button
            key="submit"
            type="primary"
            // disabled={title && issueType && status ? false : true}
            onClick={handleClick}
          >
            Sửa
          </Button>
          <Button key="back" onClick={() => setIsOpenModal(false)}>
            Hủy Bỏ
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default EditCustomer;
