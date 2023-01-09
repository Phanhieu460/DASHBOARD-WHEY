import styled from "styled-components";
import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Button,
  Input,
  Select,
  Col,
  Row,
  Avatar,
  Radio,
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

const CreateCustomer = () => {
  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [numberOfPurchase, setNumberOfPurchase] = useState("");
  const [customerType, setCustomerType] = useState("");

  const [form] = Form.useForm();

  const handleClick = () => {
    const data = {
      name,
      email,
      address,
      phone,
      gender,
      numberOfPurchase,
      customerType,
    };

    setIsOpenModal(false);
    form.resetFields();
  };
  return (
    <div>
      <div
        style={{ fontSize: 18, fontWeight: 700, padding: 24, float: "right" }}
      >
        <Button type="primary" onClick={() => setIsOpenModal(true)}>
          Thêm Khách Hàng
        </Button>
      </div>
      <Modal
        style={{ top: "50px" }}
        width={700}
        title="Khách Hàng"
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
                label="Tên Khách Hàng"
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
                label="Giới Tính"
                name="type"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Radio.Group
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                >
                  <Radio value="Nam">Nam</Radio>
                  <Radio value="Nữ">Nữ</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item
                label="Điện Thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  name="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  name="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item
                label="Địa Chỉ"
                name="address"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  name="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Loại Khách Hàng"
                name="cútomerType"
                // rules={[
                //   {
                //     required: true,
                //   },
                // ]}
              >
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
                // disabled={name ? false : true}
                onClick={handleClick}
              >
                Thêm
              </Button>
              <Button
                key="back"
                style={{
                  margin: "0 8px",
                }}
                onClick={() => setIsOpenModal(false)}
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

export default CreateCustomer;
