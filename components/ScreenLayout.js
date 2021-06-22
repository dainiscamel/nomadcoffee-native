import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function ScreenLayout({ loading, children }) {
  return (
    <View
      style={{
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      {loading ? <ActivityIndicator color="white" /> : children}
    </View>
  );
}
