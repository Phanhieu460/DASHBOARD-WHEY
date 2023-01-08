import { Button, Row, Col, Table, Input, Space } from "antd";
import React, { useRef, useState } from "react";
import Sidebar from "../../components/sidebar";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "antd/dist/antd.css";
import CreateBlog from "./Modal/CreateBlog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteBlog, getBlog } from "../../features/Blog/blogSlice";
import EditBlog from "./Modal/EditBlog";

const Blog = () => {
  const [show, setShow] = useState(false);
  const [dataEdit, setDataEdit] = useState(0);
  const closeModal = () => setShow(false);

  const dispatch = useDispatch();

  const { blogs } = useSelector((state) => state.blog);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [allData, setAllData] = useState();

  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  useEffect(() => {
    if (!blogs) return;
    setAllData(blogs.blogs);
  }, [blogs]);

  const onDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này ?")) {
      dispatch(deleteBlog(id));
      dispatch(getBlog());
    }
  };

  const onUpdate = (data) => {
    console.log("zzz", data);
    setShow(true);
    setDataEdit(data);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Tên Bài Viết",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Nội Dung",
      dataIndex: "description",
      key: "description",
      width: 250,
      ellipsis: true,
      ...getColumnSearchProps("description"),
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      width: 250,
      ellipsis: true,
      ...getColumnSearchProps("image"),
    },
    {
      title: "Người viết",
      dataIndex: "writer",
      key: "writer",
      ...getColumnSearchProps("writer"),
    },
    {
      title: "Action",
      dataIndex: "",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => onUpdate(record._id)}>
            Sửa
          </Button>
          <Button type="primary" danger onClick={() => onDelete(record._id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 6 }}>
        <Row span={24}>
          <Col xs={2} sm={4} md={6} lg={8} xl={12}>
            <p style={{ fontSize: 18, fontWeight: 700, padding: 24 }}>
              Kiến Thức
            </p>
          </Col>
          <Col xs={2} sm={4} md={6} lg={8} xl={12}>
            <CreateBlog />
          </Col>
        </Row>
        <Row span={24}>
          <Col xs={2} sm={4} md={6} lg={8} xl={24}>
            <Table columns={columns} dataSource={allData} />
          </Col>
        </Row>
      </div>
      {show ? (
        <EditBlog
          open={show}
          closeModal={closeModal}
          title="Sửa thông tin bài viết"
          dataEdit={dataEdit}
        />
      ) : null}
    </div>
  );
};

export default Blog;
