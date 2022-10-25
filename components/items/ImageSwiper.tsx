import {
  View,
  Text,
  Image,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../../constants/Layout";
import { UrlHelper } from "../../utils/helper/UrlHelper";

export default function ImageSlider(props: {
  ImageArrayUri: string[];
  dauBep?: any;
}) {
  const [active, setActive] = useState<number>(0);
  const [refScrollView, setRefScrollView] = useState<ScrollView | null>();

  const arr = props.ImageArrayUri;

  const onChange = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { nativeEvent } = event;
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== undefined) setActive(slide);
  };

  const _move = (index: number) => {
    const x = Layout.window.width * index;
    if (refScrollView) {
      refScrollView.scrollTo({
        x,
        y: 0,
        animated: true,
      });
    }
  };

  useEffect(() => {
    const toggle = setInterval(() => {
      setActive((old) => {
        let index = active;

        if (index < arr.length - 1) {
          index = index + 1;
        } else {
          index = 0;
        }
        _move(index);

        return index;
      });
    }, 5000);
    return () => clearInterval(toggle);
  }, [active]);

  return (
    <View>
      <ScrollView
        ref={(ref) => {
          setRefScrollView(ref);
        }}
        horizontal
        pagingEnabled
        onScroll={onChange}
        showsHorizontalScrollIndicator={false}
        style={{
          width: Layout.window.width,
          height: (Layout.window.width * 3) / 4,
        }}
      >
        {arr.map((item, index) => (
          <Image
            source={{ uri: UrlHelper.urlFile + item }}
            style={{
              width: Layout.window.width,
              height: (Layout.window.width * 3) / 4,
              resizeMode: "cover",
            }}
            key={`image_${index}`}
          />
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
        }}
      >
        {arr.map((item, index) => (
          <Text
            key={index}
            style={{
              color: index === active ? "#fff" : "#888",
              fontSize: 20,
              margin: 3,
            }}
          >
            ●
          </Text>
        ))}
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          alignSelf: "flex-end",
          padding: 10,
        }}
      >
        <Image
          source={
            props.dauBep?.avartarUri
              ? { uri: UrlHelper.urlFile + props.dauBep.avartarUri }
              : require("../../assets/images/logo/thinkfoodlogo.png")
          }
          style={{
            width: 60,
            height: 60,
            resizeMode: "cover",
            borderRadius: 60,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
