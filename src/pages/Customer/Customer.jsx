import { Button, Row, Col, Table, Input, Space } from "antd";
import React, { useRef, useState } from "react";
import Sidebar from "../../components/sidebar";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "antd/dist/antd.css";
import CreateCustomer from "./Modal/CreateCustomer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteCustomer,
  getCustomer,
} from "../../features/Customer/customerSlice";
import EditCustomer from "./Modal/EditCustomer";

const Customer = () => {
  const [show, setShow] = useState(false);
  const [dataEdit, setDataEdit] = useState(0);
  const closeModal = () => setShow(false);

  const dispatch = useDispatch();

  const { customers } = useSelector((state) => state.customer);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [allData, setAllData] = useState();

  useEffect(() => {
    dispatch(getCustomer());
  }, [dispatch]);

  useEffect(() => {
    if (!customers) return;
    setAllData(customers.customers);
  }, [customers]);

  const onDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa khách hàng này ?")) {
      dispatch(deleteCustomer(id));
      dispatch(getCustomer());
    }
  };

  const onUpdate = (data) => {
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
      title: "Tên Khách Hàng",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Giới Tính",
      dataIndex: "gender",
      key: "gender",
      ...getColumnSearchProps("gender"),
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Điện Thoại",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Loại Khách Hàng",
      dataIndex: "customerType",
      key: "customerType",
      ...getColumnSearchProps("customerType"),
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
              Khách Hàng
            </p>
          </Col>
          <Col xs={2} sm={4} md={6} lg={8} xl={12}>
            <CreateCustomer />
          </Col>
        </Row>
        <Row span={24}>
          <Col xs={2} sm={4} md={6} lg={8} xl={24}>
            <Table columns={columns} dataSource={allData} />
          </Col>
        </Row>
      </div>
      {show ? (
        <EditCustomer
          open={show}
          closeModal={closeModal}
          title="Sửa thông tin khách hàng"
          dataEdit={dataEdit}
        />
      ) : null}
    </div>
  );
};

export default Customer;
