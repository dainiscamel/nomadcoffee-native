import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  background-color: black;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export default function Home({ navigation }) {
  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
        <Text style={{ color: "white" }}>Photo</Text>
      </TouchableOpacity>
    </Container>
  );
}
