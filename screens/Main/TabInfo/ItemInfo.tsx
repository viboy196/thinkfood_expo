import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function ItemInfo(props: {
  imageSource?: ImageSourcePropType;
  text: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
      }}
    >
      <View style={{ flex: 2, padding: 10 }}>
        <Image
          source={
            props.imageSource
              ? props.imageSource
              : require("../../../assets/images/logo/thinkfoodlogo.png")
          }
          style={{ width: 40, height: 40 }}
        />
      </View>

      <View style={{ flex: 10 }}>
        <Text>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
}
