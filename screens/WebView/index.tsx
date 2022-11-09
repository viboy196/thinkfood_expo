import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { RootStackScreenProps } from "../../navigation/types";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AxiosRequestConfig } from "axios";
import { ExcuteResult, ResultStatusCode } from "../../utils/api/apiTypes";
import { useAppSelector } from "../../redux/store/hooks";
import axios from "../../utils/api/axios";
import ApiRequest from "../../utils/api/Main/ApiRequest";
export default function MyWebView({
  route,
  navigation,
}: RootStackScreenProps<"WebView">) {
  const [url, setUrl] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [onStartLoad, setOnStartLoad] = useState<boolean>(false);
  const [urlResponse, setUrlResponse] = useState<string>();
  const { token } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (route.params.url) {
      setUrl(route.params.url);
    }
  }, [route.params.url]);
  useEffect(() => {
    setTimeout(() => {
      if (urlResponse && token) {
        const config: AxiosRequestConfig = {
          headers: {
            accept: "text/plain",
            Authorization: `bearer ${token}`,

            "Content-Type": "application/json",
          },
        };
        axios.get(urlResponse, config).then((_res) => {
          const data = _res.data as ExcuteResult;
          if (data.code === ResultStatusCode.success) {
            Alert.alert("Thành Công", "Thanh toán Thành Công !!!", [
              {
                text: "OK",
                onPress: () => {
                  navigation.navigate("Main");
                },
              },
            ]);
            // ApiRequest.AlePayGetTransactionInfo(data.result).then((res2) => {
            //   ApiRequest.AlePayReturnBuyGoiTieuDung2(token, res2).then((res3) => {
            //     if (res3.code === ResultStatusCode.success) {
            //       setLoading(false);

            //     }
            //   });
            // });
          }
        });
      }
    }, 2000);
  }, [urlResponse]);

  return (
    <View style={{ flex: 1 }}>
      <Spinner
        visible={loading}
        textContent={`${route.params.title} ...`}
        textStyle={{ color: "#fff", fontSize: 20 }}
      />
      {urlResponse === undefined ? (
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
          onNavigationStateChange={(state) => {
            if (
              state.url.includes(axios.defaults.baseURL) &&
              urlResponse === undefined
            ) {
              setUrlResponse(state.url);
            }
          }}
        />
      ) : (
        <View></View>
      )}
    </View>
  );
}
