import React, { useEffect, useState } from "react";
import { useWindowDimensions, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import styled from "styled-components/native";

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 20px 10px;
`;
const UserAvatar = styled.Image``;
const ShopName = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;
const File = styled.Image``;

const CategoryContainer = styled.View`
  flex-direction: row;
  padding: 20px 0px;
`;
const CategoryTitle = styled.Text`
  color: white;
  margin-right: 10px;
`;

const Category = styled.Text`
  color: white;
  text-decoration-line: underline;
  font-weight: 600;
`;

export default function Photo({ id, name, photos, categories }) {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  return (
    <Container>
      <Header onPress={() => navigation.navigate("Profile")}>
        <ShopName>{name}</ShopName>
      </Header>
      <File
        resizeMode="cover"
        style={{ width, height: height - 550 }}
        source={{ uri: photos[0]?.url }}
      />
      <CategoryContainer>
        <CategoryTitle>카테고리:</CategoryTitle>
        {categories?.map((category) => (
          <Category key={category.id}>
            {category.slug}
            <Text> </Text>
          </Category>
        ))}
      </CategoryContainer>
    </Container>
  );
}
