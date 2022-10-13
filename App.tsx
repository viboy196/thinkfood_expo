import { StatusBar } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useColorScheme from "./hooks/useColorScheme";
import { tintColorLight } from "./constants/Colors";
import Navigation from "./navigation";
import RestaurantScreen from "./screens/restaurant";

import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store/store";
import useCachedResources from "./hooks/useCachedResources";
import { Provider } from "react-redux";
import LoaiThucPham from "./screens/FoodType";
import ListFood from "./screens/ListFood";
import FoodDetail from "./screens/FoodDetail";
import ImageSlider from "./components/items/ImageSwiper";

export default function App() {
  const colorScheme = useColorScheme();
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            {/* <ImageSlider /> */}
            <Navigation colorScheme={colorScheme} />
            {/* <FoodDetail /> */}
            <StatusBar
              animated={true}
              backgroundColor={tintColorLight}
              barStyle={"dark-content"}
              showHideTransition={"slide"}
              hidden={false}
            />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
}
