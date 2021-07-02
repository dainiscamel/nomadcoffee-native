import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { colors } from "../colors";
import DismissKeyboard from "../components/DismissKeyboard";

const CREATE_SHOP_QUERY = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $categories: String!
    $photos: Upload
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      categories: $categories
      photos: $photos
    ) {
      id
      name
      latitude
      longitude
      photos {
        id
        url
      }
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 20px;
`;
const Photo = styled.Image`
  height: 350px;
`;
const CreateShopContainer = styled.View`
  margin-top: 30px;
`;

const ShopTitle = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 25px;
`;
const ShopInput = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  border: 2px solid ${colors.brown};
`;

const HeaderRightText = styled.Text`
  color: ${colors.brown};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

export default function UploadForm({ route, navigation }) {
  const CreateShop = (cache, result) => {
    const {
      data: { createCoffeeShop },
    } = result;

    if (createCoffeeShop) {
      cache.modify({
        // 모든 쿼리가 들어 있는 곳
        id: "ROOT_QUERY",
        fields: {
          seeCoffeeShops(prev) {
            return [createCoffeeShop, prev];
          },
        },
      });

      navigation.navigate("Tabs");
    }
  };
  const [CreateShopMutation, { loading }] = useMutation(CREATE_SHOP_QUERY, {
    update: CreateShop,
  });

  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  );
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register("name", {
      required: true,
    });
    register("latitude", {
      required: true,
    });
    register("longitude", {
      required: true,
    });
    register("categories", {
      required: true,
    });
  }, [register]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);

  const latitudeRef = useRef();
  const longitudeRef = useRef();
  const categoriesRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onValid = ({ name, latitude, longitude, categories }) => {
    const photos = new ReactNativeFile({
      uri: route.params.file,
      name: `1.jpg`,
      type: "image/jpeg",
    });
    CreateShopMutation({
      variables: {
        name,
        latitude,
        longitude,
        categories,
        photos,
      },
    });
  };

  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: route.params.file }} />
        <ShopTitle>Shop Information</ShopTitle>
        <CreateShopContainer>
          <ShopInput
            returnKeyType="next"
            placeholder="Shop name"
            autoCapitalize="none"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onSubmitEditing={() => onNext(latitudeRef)}
            onChangeText={(text) => setValue("name", text)}
          />

          <ShopInput
            returnKeyType="next"
            placeholder="latitude"
            autoCapitalize="none"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onSubmitEditing={() => onNext(longitudeRef)}
            onChangeText={(text) => setValue("latitude", text)}
          />

          <ShopInput
            returnKeyType="next"
            placeholder="longitude"
            autoCapitalize="none"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onSubmitEditing={() => onNext(categoriesRef)}
            onChangeText={(text) => setValue("longitude", text)}
          />

          <ShopInput
            returnKeyType="done"
            placeholder="Categories"
            autoCapitalize="none"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => setValue("categories", text)}
          />
        </CreateShopContainer>
      </Container>
    </DismissKeyboard>
  );
}
