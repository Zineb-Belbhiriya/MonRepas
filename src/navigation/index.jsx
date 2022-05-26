import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../constants/theme";
import Profile from "../screens/Profile";
import CartShop from "../screens/CartShop";

import Pharmacies from "../screens/Pharmacies";
import Food from "../screens/Food";
import { FoodInfo } from "../screens/FoodInfo";

import { TabBarIcon, MapButton } from "../components/index";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MenuInfo } from "../screens/MenuInfo";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const cart = useSelector((state) => state.cart);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: Platform.OS === "ios" ? 80 : 60,
        },
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              Icon={<Ionicons name="heart-outline" size={24} color="black" />}
              name="Profile"
              source={require("../../assets/png/user.png")}
              isFocuse={focused}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Food"
        component={Food}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="Food"
              source={require("../../assets/png/food.png")}
              isFocuse={focused}
            />
          ),
        }}
      ></BottomTab.Screen>

      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          title: "O'chef.ma",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#fff" },
          headerTintColor: "#000",
          headerTitleStyle: {
            color: COLORS.primary,
            ...FONTS.h2,
          },
          tabBarIcon: ({ focused }) => <MapButton isFocuse={focused} />,
        }}
      />
      <BottomTab.Screen
        name="Commande"
        component={CartShop}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={`Cart ${cart.total} dh`}
              source={require("../../assets/png/cart.png")}
              isFocuse={focused}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="Réglages"
              source={require("../../assets/png/settings.png")}
              isFocuse={focused}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FoodInfo"
        component={FoodInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MenuInfo"
        component={MenuInfo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function FoodNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Food"
        component={Food}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FoodInfo"
        component={FoodInfo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
