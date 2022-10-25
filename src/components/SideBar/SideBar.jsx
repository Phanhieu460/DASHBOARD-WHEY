import { Menu } from "antd";
import React from "react";
import styled from "styled-components";
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <Container>
      <Top>
        {/* <Link style={{ textDecoration: "none" }}> */}
        <span className="logo">WheyStore</span>
        {/* </Link> */}
      </Top>
      <hr />
      <Center>
        <ul>
          <Title>MAIN</Title>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Title>LISTS</Title>
          <Link to="/user" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/product" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          <Link to="/blog" style={{ textDecoration: "none" }}>
            <li>
              <NotificationsNoneIcon className="icon" />
              <span>Blog</span>
            </li>
          </Link>

          <Title>USER</Title>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </Center>
    </Container>
  );
};

export default SideBar;

const Container = styled.div`
  flex: 1;
  border-right: 0.5px solid rgb(230, 227, 227);
  min-height: 100vh;
  background-color: white;
`;
const Top = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo {
    font-size: 20px;
    font-weight: bold;
    color: #6439ff;
  }
`;
const Center = styled.div`
  padding-left: 10px;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      display: flex;
      align-items: center;
      padding: 5px;
      cursor: pointer;

      &:hover {
        background-color: #ece8ff;
      }

      .icon {
        font-size: 24px;
        color: #7451f8;
      }

      span {
        font-size: 14px;
        font-weight: 600;
        color: #888;
        margin-left: 10px;
      }
    }
  }
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #999;
  margin-top: 15px;
  margin-bottom: 5px;
`;
