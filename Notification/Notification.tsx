import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Alert, Platform } from "react-native";
// import { getFullPath } from "../navigation";
import { logOut } from "../redux/features/auth/authSlices";
import { setStateNotification } from "../redux/features/notification/NotificationSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import ApiRequest from "../utils/api/Main/ApiRequest";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Notification() {
  const [expoPushToken, setExpoPushToken] = useState<string>();

  const { token, accountDetail } = useAppSelector((s) => s.auth);

  const noti = useAppSelector((s) => s.noti);

  const dispatch = useAppDispatch();
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  //add this
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        console.log("addNotificationReceivedListener");
        console.log(notification.request.content);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("addNotificationResponseReceivedListener");
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    console.log("vao day expo token");

    if (
      expoPushToken &&
      token &&
      accountDetail?.id &&
      noti.expoToken !== expoPushToken
    ) {
      ApiRequest.AppTokenAdd(token, {
        token: expoPushToken,
        deviceOs: "expo",
        idKhachHang: accountDetail.id,
      })
        .then((res) => {
          if (res.code === "00") {
            console.log("register token successs");
            dispatch(
              setStateNotification({ input: { expoToken: expoPushToken } })
            );
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(logOut());
        });
    } else {
      console.log("loi dang ky expo");

      console.log(expoPushToken);

      console.log("token", token);
      console.log("accountDetails?.id", accountDetail?.id);
      console.log("noti.expoToken", noti.expoToken);
    }
  }, [expoPushToken, token, accountDetail?.id]);

  useEffect(() => {
    if (lastNotificationResponse) {
      const data = JSON.stringify(
        lastNotificationResponse.notification.request.content.data
      );
      const json = JSON.parse(data);

      console.log("lastNotificationResponse", data);
      //   getFullPath({ invoiceId: json.invoiceId });
    }
  }, [lastNotificationResponse]);

  return <></>;
}

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: "Here is the notification body",
//       data: { data: "goes here" },
//     },
//     trigger: { seconds: 1 },
//   });
// }

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("expoToken", token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
