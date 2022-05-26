import React, { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import {
  Pressable,
  StyleSheet,
  Text,
  Image,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import { SIZES } from "../constants/theme";
//navigation
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

import { Button, Icon } from "react-native-elements";
import { PharmacyInfo } from "../components/modals/PharmacyInfo";
import { CardFood } from "../components/CardFood";
import { MenuCardFood } from "../components/MenuCardFood";
import { useSelector } from "react-redux";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

  const cart = useSelector((state) => state.cart);

  const [Food, setFood] = useState([]);
  const [menu, setMenu] = useState([]);
  const navigation = useNavigation();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getAllFood = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
      query:
        "query Query {\r\n  getAllProducts {\r\n    id\r\n    name\r\n    description\r\n    image\r\n    price\r\n    status\r\n    createdAt\r\n  }\r\n}",
      variables: {},
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: graphql,
      redirect: "follow",
    };

    fetch("https://foodaly.herokuapp.com/gql", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setFood(result.data.getAllProducts);
      })
      .catch((error) => console.log("error", error));
  };

  const getAllMenu = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
      query:
        "query GetAllMenu {\r\n  getAllMenu {\r\n    id\r\n    name\r\n    productIds {\r\n      id\r\n      name\r\n      image\r\n    price\r\n    image\r\n    description}\r\n  }\r\n}",
      variables: {},
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: graphql,
      redirect: "follow",
    };

    fetch("https://foodaly.herokuapp.com/gql", requestOptions)
      .then((response) => response.json())
      .then((result) => setMenu(result.data.getAllMenu))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllFood();
    getAllMenu();
  }, [refreshing]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ flex: 1 }}
    >
      <View style={tw`p-3  pt-4 w-full `}>
        <Text style={tw`text-3xl font-bold`}>Our Food</Text>
      </View>

      <View style={tw`p-3 flex-wrap flex-row w-full justify-evenly pt-0`}>
        {Food.length === 0 && (
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 200,
              height: 200,
              backgroundColor: "#eee",
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require("../../assets/lottie/loading.json")}
          />
        )}
        {Food?.map((item, index) => (
          <CardFood key={index} {...{ ...item, Food }} />
        ))}
      </View>
      <View style={tw`p-3  pt-4 `}>
        <Text style={tw`text-3xl font-bold mb-6 mt-10`}>Our Menu</Text>

        {menu.map((_, idx) => {
          return (
            <MenuCardFood
              key={idx}
              menu={_}
              navigation={navigation}
              Food={Food}
            />
          );
        })}
      </View>
      <StatusBar style="dark" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: SIZES.width,
    height: SIZES.height,
  },
});
