import { Button, Row, Col, Table, Input, Space } from "antd";
import React, { useRef, useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import {
  deleteProduct,
  listProducts,
} from "../../Redux/Actions/ProductActions";
import { Link, NavLink } from "react-router-dom";

const Product = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, successDelete]);

  const onDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này ?")) {
      dispatch(deleteProduct(id));
    }
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
      title: "Tên Sản Phẩm",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Loại Sản Phẩm",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Mô Tả Ngắn",
      dataIndex: "shortDescription",
      key: "shortDescription",
      ellipsis: true,
      ...getColumnSearchProps("shortDescription"),
    },
    {
      title: "Mô Tả",
      dataIndex: "fullDescription",
      key: "fullDescription",
      ellipsis: true,
      ...getColumnSearchProps("fullDescription"),
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      ellipsis: true,
      ...getColumnSearchProps("image"),
    },
    {
      title: "Số Lượng",
      dataIndex: "stock",
      key: "stock",
      ...getColumnSearchProps("stock"),
    },
    {
      title: "Giá Nhập",
      dataIndex: "salePrice",
      key: "salePrice",
      ...getColumnSearchProps("salePrice"),
    },
    {
      title: "Giá Bán",
      dataIndex: "entryPrice",
      key: "entryPrice",
      ...getColumnSearchProps("entryPrice"),
    },
    {
      title: "Giảm Giá",
      dataIndex: "discount",
      key: "discount",
      ...getColumnSearchProps("discount"),
    },
    {
      title: "Action",
      dataIndex: "",
      render: (_, record) => (
        <Space size="middle" direction="vertical" align="center">
          <Button type="primary">
            <Link to={`/product/${record._id}/edit`}>Sửa</Link>
          </Button>
          <Button type="primary" danger onClick={() => onDelete(record._id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div className="card-body">
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Row span={24}>
          <Col xs={2} sm={4} md={6} lg={8} xl={12}>
            <p style={{ fontSize: 18, fontWeight: 700, padding: 24 }}>
              Sản Phẩm
            </p>
          </Col>
          <Col xs={2} sm={4} md={6} lg={8} xl={12}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                padding: 24,
                float: "right",
              }}
            >
              <Button type="default">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/addproduct"
                >
                  <i className="icon fas fa-cart-plus"></i>
                  <span className="text mx-10"> Thêm sản phẩm </span>
                </NavLink>
              </Button>
            </div>
          </Col>
        </Row>
        <Row span={24}>
          <Col xs={2} sm={4} md={6} lg={8} xl={24}>
            <Table columns={columns} dataSource={products} />
          </Col>
        </Row>
      </main>
    </div>
  );
};

export default Product;
