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
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid black;
  padding: 10px;
`;
const Image = styled.img``;

const ImageTitle = styled.span`
  font-weight: bold;
  font-size: 20px;
`;

const Photos = (props) => {
  const [photos, setPhotos] = useState([]);
  const params = useParams();
  const [dataAvaliable, setDataAvaliable] = useState(false);
  const url = `https://jsonplaceholder.typicode.com/photos?albumId=${params.id}`;

  const getPhotoData = () => {
    setDataAvaliable(true);
    axios.get(url).then((response) => {
      setPhotos(response.data);
      setDataAvaliable(false);
    });
  };

  useEffect(() => {
    getPhotoData();
  }, [url]);

  return (
    <Container>
      <Title>Photos</Title>
      {dataAvaliable ? (
        <Loader />
      ) : (
        <Wrapper>
          {photos.map((each) => (
            <PhotoContainer>
              <Image src={each.url} />
              <ImageTitle>{each.title}</ImageTitle>
            </PhotoContainer>
          ))}
        </Wrapper>
      )}
    </Container>
  );
};

export default Photos;
