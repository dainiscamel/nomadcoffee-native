import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screen/Home";
import Search from "../screen/Search";
import Profile from "../screen/Profile";
import ProfileLoggedOut from "../screen/ProfileLoggedOut";
import Me from "../screen/Me";
import { Image } from "react-native";
import Login from "../screen/Login";
import CreateAccount from "../screen/CreateAccount";
import Photo from "../screen/Photo";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          borderBottomColor: "rgba(255, 255, 255, 0.3)",
          shadowColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: "black",
        },
      }}
    >
      {screenName === "Home" ? (
        <Stack.Screen
          name={"Home"}
          component={Home}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 120,
                  height: 40,
                }}
                resizeMode="contain"
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name={"Search"} component={Search} />
      ) : null}
      {screenName === "Me" ? <Stack.Screen name={"Me"} component={Me} /> : null}
      {screenName === "ProfileLoggedOut" ? (
        <Stack.Screen name={"ProfileLoggedOut"} component={ProfileLoggedOut} />
      ) : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="Photo" component={Photo} />
    </Stack.Navigator>
  );
}
