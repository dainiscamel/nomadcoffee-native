import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const SEARCH_COFFEESHOPS = gql`
  query searchCoffeeShops($keyword: String!) {
    searchCoffeeShops(keyword: $keyword) {
      id
      name
      photos {
        id
        url
      }
    }
  }
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`;

const InputWrapper = styled.View`
  flex-direction: row;
  border-color: rgba(255, 255, 255, 0.3);
  border-width: 2px;
  padding: 10px;
  border-radius: 20px;
  width: ${(props) => props.width / 1.1}px;
`;

const Input = styled.TextInput`
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  margin-left: 10px;
`;

export default function Search({ navigation }) {
  const numColumns = 2;
  const { width } = useWindowDimensions();
  const { setValue, register, watch, handleSubmit } = useForm();
  const [searchCoffeeShops, { loading, data, called }] =
    useLazyQuery(SEARCH_COFFEESHOPS);
  const onValid = ({ keyword }) => {
    searchCoffeeShops({
      variables: {
        keyword,
      },
    });
  };

  const SearchBox = () => (
    <InputWrapper width={width}>
      <Ionicons name="search" size={20} color="rgba(255, 255, 255, 0.8)" />
      <Input
        placeholderTextColor="rgba(255, 255, 255, 0.8)"
        placeholder="Search Coffeeshops"
        autoCapitalize="none"
        returnKeyLabel="Search"
        returnKeyType="search"
        autoCorrect={false}
        onChangeText={(text) => setValue("keyword", text)}
        onSubmitEditing={handleSubmit(onValid)}
      />
    </InputWrapper>
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", {
      required: true,
      minLength: 1,
    });
  }, []);
  const renderItem = ({ item: shop }) => (
    <TouchableOpacity>
      <Image
        source={{ uri: shop.photos[0].url }}
        style={{
          width: width / numColumns,
          height: 200,
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.8)",
        }}
      />
    </TouchableOpacity>
  );
  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: "black", padding: 10 }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchCoffeeShops !== undefined ? (
          data?.searchCoffeeShops?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              data={data?.searchCoffeeShops}
              keyExtractor={(shop) => "" + shop.id}
              renderItem={renderItem}
              numColumns={numColumns}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
