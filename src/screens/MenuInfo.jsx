import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import tw from "twrnc";
import { useState } from "react";
import { CardFood } from "../components/CardFood";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { addPrice, addToCart } from "../app/features/cart/cartSlice";

const Stars = ({ rating }) => {
  return (
    <>
      {Array(rating)
        .fill(0)
        .map((item, index) => (
          <Ionicons
            key={index}
            style={tw`mx-[1px]`}
            name="md-star"
            size={15}
            color="red"
          />
        ))}
    </>
  );
};

const FoodOrder = ({ price, products }) => {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  let newProducts = products.map((item) => {
    return {
      ...item,
      quantity: count,
    };
  });

  const translateY = new Animated.Value(0);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [cart]);

  return (
    <View
      style={tw` pb-7 justify-end rounded-t-3xl bg-white absolute w-full bottom-0 p-5 z-50 `}
    >
      <View style={tw`flex-row justify-end mb-3 items-center w-full`}>
        <Counter count={count} setCount={setCount} />
      </View>
      <View style={tw` flex-row justify-between items-center w-full`}>
        <Text style={tw`text-2xl font-black`}>Total: {price * count} dh</Text>
        <TouchableOpacity
          onPress={() => {
            newProducts.map((item) => {
              return dispatch(
                addToCart({
                  product: item,
                  quantity: count,
                })
              );
            });
            alert("menu added to cart");
          }}
          style={tw`p-2 rounded-2xl flex-row justify-between items-center bg-red-600`}
        >
          <Ionicons name="md-cart" size={20} color="white" />

          <Text style={tw`text-2xl font-black ml-3 text-white`}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Counter = ({ count, setCount }) => {
  return (
    <View
      style={tw`flex-row justify-evenly items-center bg-red-600 w-[90px] p-1 rounded-full`}
    >
      <TouchableOpacity
        style={tw`px-2`}
        onPress={() => {
          if (count != 1) setCount(count - 1);
        }}
      >
        <Text
          style={tw`text-2xl text-white font-bold flex-row items-center justify-center`}
        >
          -
        </Text>
      </TouchableOpacity>
      <Text
        style={tw`text-2xl text-white font-bold flex-row items-center justify-center`}
      >
        {count}
      </Text>
      <TouchableOpacity
        style={tw`px-2`}
        onPress={() => {
          setCount(count + 1);
        }}
      >
        <Text
          style={tw`text-2xl text-white font-bold flex-row items-center justify-center`}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const MenuInfo = ({ navigation, route }) => {
  const { id, name, food, Food } = route.params;
  const [count, setCount] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(food.reduce((acc, item) => +acc + +item.price, 0));
  }, [food]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Text style={tw`text-2xl font-black text-center`}>{name}</Text>
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <View style={tw`p-3 flex-wrap justify-between flex-row w-full pt-0`}>
          {food.map((item, index) => (
            <CardFood
              key={index}
              name={item.name}
              image={item.image}
              description={item.description}
              price={item.price}
              rating={item.rating}
              navigation={navigation}
              Food={Food}
            />
          ))}
        </View>
      </ScrollView>
      <FoodOrder price={price} products={food} />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 10,
  },
});
