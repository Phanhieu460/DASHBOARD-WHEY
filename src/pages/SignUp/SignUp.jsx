import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Icon from "../../components/Icon/Icon";
import { SiGmail } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "antd";
import { register } from "../../features/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { openNotification } from "../../util/notification";

const SignUp = () => {
  const FacebookBackground =
    "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
  const InstagramBackground =
    "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
  const TwitterBackground =
    "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)";
  const GmailBackground =
    "linear-gradient(to right, #4285F4 , #BB001B , #EA4335 , #FBBC05 , #34A853 )";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("")
  const [fullName, setFullName] = useState("")
  const [address, setAddress] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, message } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (isSuccess) {
      navigate("/")
      openNotification("success", "Success", message)
     }
  }, [isSuccess])
  

  const onFinish = (e) => {
    const userData = {
      username,
      password,
      phone, 
      fullName
    };

    dispatch(register(userData));

  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <MainContainer>
      <MainBox>
        <WelcomeText>Đăng Ký Tài Khoản</WelcomeText>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ width: "100%" }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: (
                  <InputContainer>Please input your email!</InputContainer>
                ),
              },
              {
                min: 5,
                message: (
                  <InputContainer>
                    Username must be at least 5 characters long.
                  </InputContainer>
                ),
              },
            ]}
          >
            <InputContainer>
              <StyledInput
                type="email"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputContainer>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: (
                  <InputContainer>Please input your password!</InputContainer>
                ),
              },
              {
                min: 5,
                message: (
                  <InputContainer>
                    Password must be at least 5 characters long.
                  </InputContainer>
                ),
              },
            ]}
          >
            <InputContainer>
              <StyledInput
                type="password"
                placeholder="Mật Khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputContainer>
          </Form.Item>
          <Form.Item
            name="fullName"
            rules={[
              {
                required: true,
                message: (
                  <InputContainer>Please input your fullName!</InputContainer>
                ),
              },
              {
                min: 5,
                message: (
                  <InputContainer>
                    Fullname must be at least 5 characters long.
                  </InputContainer>
                ),
              },
            ]}
          >
            <InputContainer>
              <StyledInput
                type="text"
                placeholder="Fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </InputContainer>
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: (
                  <InputContainer>Please input your Phone!</InputContainer>
                ),
              },
              {
                min: 10,
                message: (
                  <InputContainer>
                    Phone must be at least 10 characters long.
                  </InputContainer>
                ),
              },
            ]}
          >
            <InputContainer>
              <StyledInput
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </InputContainer>
          </Form.Item>
          {/* <Form.Item
            name="address"
          >
            <InputContainer>
              <StyledInput
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </InputContainer>
          </Form.Item> */}
          <Form.Item>
            <ButtonContainer>
              <StyledButton>Đăng Ký</StyledButton>
            </ButtonContainer>
          </Form.Item>
        </Form>
        <LoginWith>Hoặc Đăng Ký Với</LoginWith>
        <HorizontalRule />
        <IconsContainer>
          <Icon color={FacebookBackground}>
            <FacebookOutlined />
          </Icon>
          <Icon color={InstagramBackground}>
            <InstagramOutlined />
          </Icon>
          <Icon color={GmailBackground}>
            <SiGmail />
          </Icon>
        </IconsContainer>
        <ForgotPassword>
          Bạn Đã Có Tài Khoản? <Link to="/login">Đăng Nhập</Link>
        </ForgotPassword>
      </MainBox>
    </MainContainer>
  );
};

export default SignUp;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const MainBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 80vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 65%;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
`;

const StyledInput = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  width: 80%;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: #b9abe099;
    font-weight: 100;
    font-size: 1rem;
  }
`;

const LoginWith = styled.span`
  color: black;
  cursor: pointer;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 3rem 0;
  width: 80%;
`;

const ForgotPassword = styled.span`
  color: black;
  cursor: pointer;
`;
