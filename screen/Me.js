import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";

const Container = styled.View`
  background-color: black;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.View`
  width: 150px;
  height: 150px;
  border-radius: 100px;
  background-color: #2c2c2c;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

export const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatarURL
    }
  }
`;

export default function Me() {
  const hasToken = useReactiveVar(isLoggedInVar);

  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });
  console.log(data?.me?.avatarURL);
  return (
    <Container>
      <ImageWrapper>
        <Image resizeMode="cover" source={{ uri: data?.me?.avatarURL }} />
      </ImageWrapper>
      <Text style={{ color: "white" }}>{data?.me?.username}</Text>
    </Container>
  );
}
