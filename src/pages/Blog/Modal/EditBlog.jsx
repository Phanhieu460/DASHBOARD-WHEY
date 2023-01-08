import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Input, Select, Col, Row, Avatar } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlog,
  getBlog,
  getBlogById,
} from "../../../features/Blog/blogSlice";
import { updateBlog } from "../../../features/Blog/blogSlice";

const { Option } = Select;

const EditBlog = (props) => {
  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [writer, setWriter] = useState("");

  const { blog } = useSelector((state) => state.blog);

  const [form] = Form.useForm();

  // useEffect(() => {
  //   dispatch(getBlogById(params.id))
  // }, [blog])

  const handleClick = () => {
    const data = {
      name,
      description,
      image,
      writer,
    };
    dispatch(updateBlog(data));
    dispatch(getBlog());
    setIsOpenModal(false);
    form.resetFields();
  };
  return (
    <div>
      <Modal
        style={{ top: "50px" }}
        width={700}
        title="Kiến Thức"
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
          {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
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
              </Form.Item></Col>
          </Row> */}
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

export default EditBlog;
