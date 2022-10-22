import { View, Text, StyleProp, TextStyle } from "react-native";
import React, { useEffect, useState } from "react";

export default function Textblink(props: {
  style?: StyleProp<TextStyle>;
  text: string;
}) {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setShow((old) => !old);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <View style={{ position: "absolute" }}>
      <Text style={[{ display: show ? "none" : "flex" }, props.style]}>
        {props.text}
      </Text>
    </View>
  );
}
