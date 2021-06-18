import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";

const Container = styled.View`
  background-color: black;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export default function Profile({ navigation }) {
  return (
    <Container>
      <Text>Profile</Text>
    </Container>
  );
}
