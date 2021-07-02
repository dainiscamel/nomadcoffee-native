import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React from "react";
import { useEffect } from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import { colors } from "../colors";

const Container = styled.View`
  background-color: black;
  flex: 1;
  /* justify-content: center; */
  align-items: center;
`;

const Top = styled.View`
  flex: 0.5;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

const Bottom = styled.TouchableOpacity`
  flex: 1.5;
`;

const ImageWrapper = styled.View`
  width: 150px;
  height: 150px;
  border-radius: 100px;
  background-color: #2c2c2c;
  overflow: hidden;
  border: 1px solid ${colors.brown};
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const ButtonWrapper = styled.View`
  /* flex-direction: row; */
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding: 30px 0;
`;

const Button = styled.TouchableOpacity`
  background-color: ${colors.brown};
  padding: 13px 10px;
  border-radius: 3px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
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

export default function Me({ navigation }) {
  const hasToken = useReactiveVar(isLoggedInVar);

  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: data?.me?.username,
    });
  }, []);

  return (
    <Container>
      <Top>
        <ImageWrapper>
          <Image resizeMode="cover" source={{ uri: data?.me?.avatarURL }} />
        </ImageWrapper>
        <ButtonWrapper>
          <Button>
            <ButtonText>Edit Profile</ButtonText>
          </Button>
          <Button onPress={() => navigation.navigate("Upload")}>
            <ButtonText>Create Shop</ButtonText>
          </Button>
        </ButtonWrapper>
      </Top>
      <Bottom></Bottom>
    </Container>
  );
}
