import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Loader from "./Loader";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.b`
  font-size: 46px;
  text-align: center;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
`;
const EachItem = styled.span`
  width: 88%;
  /* padding-left: 10px; */
  font-size: 24px;
`;
const Button = styled.button`
  width: 10%;
  padding: 5px;
  background-color: black;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
`;
const Wrapper = styled.div`
  display: flex;
  border: 2px solid black;
  padding: 20px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  align-items: center;
`;

const Number = styled.b`
  font-size: 16px;
  width: 2%;
`;

const Users = () => {
  const [dataAvaliable, setDataAvaliable] = useState(false);
  const url = "https://jsonplaceholder.typicode.com/users";
  const [user, setUser] = useState([]);
  const getUserData = () => {
    axios.get(url).then((response) => {
      setDataAvaliable(true);
      setUser(response.data);
      setDataAvaliable(false);
    });
  };
  useEffect(() => {
    getUserData();
  }, [url]);
  const redirectToAlbums = (id) => {
    window.location = `/albums/${id}`;
  };
  return (
    <Container>
      <Title>Users</Title>
      {dataAvaliable ? (
        <Loader />
      ) : (
        <Item>
          {user.map((each, index) => (
            <Wrapper>
              <Number>{each.id}.</Number>
              <EachItem key={each.id}>{each.username}</EachItem>
              <Button key={index} onClick={() => redirectToAlbums(each.id)}>
                Albums
              </Button>
            </Wrapper>
          ))}
        </Item>
      )}
    </Container>
  );
};

export default Users;
