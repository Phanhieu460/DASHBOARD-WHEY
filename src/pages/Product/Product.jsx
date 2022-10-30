import { Button, Row, Col, Table, Input, Space } from "antd";
import React, { useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/SideBar/SideBar";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "antd/dist/antd.css";
import CreateProduct from "./Modal/CreateProduct";
import { useEffect } from "react";
import { deleteProduct, getProduct } from "../../features/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import EditProduct from "./Modal/EditProduct";
import { useLocation, useNavigate } from "react-router-dom";

const Product = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [allProduct, setAllProduct] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    if (!products) return;
    setAllProduct(products.products);
  }, [products]);

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
      dataIndex: "type",
      key: "type",
      ...getColumnSearchProps("type"),
    },
    {
      title: "Mô Tả",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      ...getColumnSearchProps("image"),
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
      ...getColumnSearchProps("quantity"),
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
      title: "Người Thêm",
      dataIndex: "adminId",
      key: "adminId",
      ...getColumnSearchProps("adminId"),
    },
    {
      title: "Action",
      dataIndex: "",
      render: (_, record) => (
        <Space size="middle">
          <EditProduct data={record._id}/>
          <Button
            type="primary"
            onClick={() => {
              dispatch(deleteProduct(record._id));
              dispatch(getProduct());
            }}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ flex: 6 }}>
        <Navbar />
        <Row span={24}>
          <Col xs={2} sm={4} md={6} lg={8} xl={12}>
          <p style={{ fontSize: 18, fontWeight: 700, padding: 24 }}>
              Sản Phẩm
            </p>
          </Col>
          <Col xs={2} sm={4} md={6} lg={8} xl={12}>
            <CreateProduct />
          </Col>
        </Row>
        <Row span={24}>
          <Col xs={2} sm={4} md={6} lg={8} xl={24}>
            <Table columns={columns} dataSource={allProduct} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Product;
