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
import { TypeDauBep } from "../../utils/helper/DauBepHelper";
import { getStatusDoAn } from "../../utils/helper/HelperFunc";
import { useAppSelector } from "../../redux/store/hooks";

export default function ImageSlider(props: {
  ImageArrayUri: string[];
  dauBep?: TypeDauBep;
  isBook?: boolean;
  timeBook?: string;
  datCo?: boolean;
  onClickDauBep?: () => void;

  onClickCart?: () => void;

  status?: string;
  activeTime?: string;
}) {
  const [active, setActive] = useState<number>(0);
  const [refScrollView, setRefScrollView] = useState<ScrollView | null>();

  const arr = props.ImageArrayUri;
  const { listCartItem } = useAppSelector((s) => s.cart);

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
        onPress={() => {
          if (props.onClickDauBep) {
            props.onClickDauBep();
          }
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
      <View
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: getStatusDoAn(props.status, props.activeTime)
              .backgroundColor,
            borderRadius: 8,
            padding: 8,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              color: getStatusDoAn(props.status, props.activeTime).color,
            }}
          >
            {props?.isBook === true &&
              props?.timeBook &&
              `Đặt trước ${props?.timeBook}`}
            {props.datCo === true && "Đặt tiệc"}
            {!(props?.isBook === true && props?.timeBook) &&
              !(props.datCo === true) &&
              getStatusDoAn(props.status, props.activeTime).text}
          </Text>
        </View>
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={props.onClickCart}
        >
          <Image
            source={require("../../assets/images/logo/shopping-cart-icon.png")}
            resizeMode="cover"
            style={{
              width: 35,
              tintColor: "#fff",
              height: 28,
            }}
          />
          {listCartItem && listCartItem.length > 0 && (
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: "rgba(0,0,0,0.1)",
                backgroundColor: "red",
                position: "absolute",
                top: -5,
                right: -5,
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 10,
                  textAlign: "center",
                }}
              >
                {listCartItem.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
