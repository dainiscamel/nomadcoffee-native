import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  background-color: black;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export default function Search({ navigation }) {
  return (
    <Container>
      <Text style={{ color: "white" }}>Search</Text>
    </Container>
  );
}
