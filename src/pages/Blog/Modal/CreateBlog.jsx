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
import { createBlog, getBlog } from "../../../features/Blog/blogSlice";

const { Option } = Select;

const CreateBlog = () => {
  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [writer, setWriter] = useState("");

  const [form] = Form.useForm();

  const handleClick = () => {
    const data = {
      name,
      description,
      image,
      writer,
    };
    dispatch(createBlog(data));
    dispatch(getBlog());
    setIsOpenModal(false);
    form.resetFields();
  };
  return (
    <div>
      <div
        style={{ fontSize: 18, fontWeight: 700, padding: 24, float: "right" }}
      >
        <Button type="primary" onClick={() => setIsOpenModal(true)}>
          Thêm Bài Viết
        </Button>
      </div>
      <Modal
        style={{ top: "50px" }}
        width={700}
        title="Kiến Thức"
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
                label="Tên Bài Viết"
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

          <Row>
            <Col span={24}>
              <Form.Item
                label="Mô tả"
                name="descriptionProduct"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
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
            <Col span={24}>
              <Form.Item
                label="Hình Ảnh"
                name="image"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  name="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item
                label="Người viết"
                name="writer"
                // rules={[
                //   {
                //     required: true,
                //   },
                // ]}
              >
                <Input
                  name="text"
                  value={writer}
                  onChange={(e) => setWriter(e.target.value)}
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

export default CreateBlog;
