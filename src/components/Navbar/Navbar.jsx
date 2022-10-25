import React from "react";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Search>
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </Search>
        <StyledAvatar>
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </StyledAvatar>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  height: 50px;
  border-bottom: 0.5px solid rgb(230, 227, 227);
  display: flex;
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  border: 0.5px solid lightgray;
  padding: 3px;

  input {
    border: none;
    outline: none;
    background: transparent;

    &::placeholder {
      font-size: 12px;
    }
  }
`;
const StyledAvatar = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
`
