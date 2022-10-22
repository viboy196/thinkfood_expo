import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { RootStackScreenProps } from "../../navigation/types";
import Spinner from "react-native-loading-spinner-overlay/lib";
export default function MyWebView({
  route,
  navigation,
}: RootStackScreenProps<"WebView">) {
  const [url, setUrl] = useState<string>("http://thinkfood.vn");
  const [loading, setLoading] = useState<boolean>(true);
  const [onStartLoad, setOnStartLoad] = useState<boolean>(false);
  useEffect(() => {
    if (route.params.url) {
      setUrl(route.params.url);
    }
  }, [route.params.url]);

  return (
    <View style={{ flex: 1 }}>
      <Spinner
        visible={loading}
        textContent={`${route.params.title} ...`}
        textStyle={{ color: "#fff", fontSize: 20 }}
      />
      <WebView
        source={{
          uri: url,
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadStart={() => {
          console.log("bắt đầu load");

          setLoading(true);
          setOnStartLoad(true);
        }}
        onLoadEnd={() => {
          console.log("load xong");
          if (onStartLoad) {
            setLoading(false);
          }
        }}
      />
    </View>
  );
}
