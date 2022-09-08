/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "./types";
import LinkingConfiguration from "./LinkingConfiguration";
import MainScreen from "../screens/Main";
import LoginScreen from "../screens/Login/LoginScreen";

import { useAppSelector } from "../redux/store/hooks";
import FoodType from "../screens/FoodType";
import ListFood from "../screens/ListFood";
import FoodDetail from "../screens/FoodDetail";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const auth = useAppSelector((state) => state.auth);
  console.log("auth", auth);

  if (auth.token)
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="FoodType"
          component={FoodType}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ListFood"
          component={ListFood}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="FoodDeTail"
          component={FoodDetail}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    );
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
