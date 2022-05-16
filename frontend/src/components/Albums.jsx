import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
const Item = styled.div``;

const Wrapper = styled.div`
  display: flex;
  border: 2px solid black;
  padding: 20px;
  margin: 0 10px 10px 10px;
  align-items: center;
`;
const EachItem = styled.span`
  width: 88%;
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
const Number = styled.b`
  font-size: 16px;
  width: 2%;
`;
const Albums = () => {
  const [dataAvaliable, setDataAvaliable] = useState(false);
  const [album, setAlbum] = useState([]);
  const params = useParams();
  const getAlbumData = () => {
    setDataAvaliable(true);
    axios.get(url).then((response) => setAlbum(response.data));
    setDataAvaliable(false);
  };

  const url = `https://jsonplaceholder.typicode.com/albums?userId=${params.id}`;
  useEffect(() => {
    getAlbumData();
  }, [url]);
  const redirectToPhotos = (id) => {
    window.location = `/photos/${id}`;
  };

  return (
    <Container>
      <Title>Albums</Title>
      {dataAvaliable ? (
        <Loader />
      ) : (
        <Item>
          {album.map((each, index) => (
            <Wrapper>
              <Number>{index + 1}.</Number>
              <EachItem>{each.title}</EachItem>
              <Button onClick={() => redirectToPhotos(each.id)}>Photos</Button>
            </Wrapper>
          ))}
        </Item>
      )}
    </Container>
  );
};

export default Albums;
