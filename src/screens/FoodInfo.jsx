import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import tw from "twrnc";
import { useState } from "react";
import { CardFood } from "../components/CardFood";
import { WebView } from "react-native-webview";
import { useDispatch } from "react-redux";
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

export const FoodOrder = ({ price, product, quantity }) => {
  const dispatch = useDispatch();

  return (
    <View
      style={tw`flex-row pb-7 justify-between items-center w-full rounded-t-3xl bg-white absolute bottom-0 p-5 z-50 `}
    >
      <Text style={tw`text-2xl font-black`}>Total: {price} dh</Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(
            addToCart({
              product,
              quantity,
            })
          );
          alert("add to cart");
        }}
        style={tw`p-2 rounded-2xl flex-row justify-between items-center bg-red-600`}
      >
        <Ionicons name="md-cart" size={20} color="white" />
        <Text style={tw`text-2xl font-black ml-3 text-white`}>Add to Cart</Text>
      </TouchableOpacity>
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

export const FoodInfo = ({ navigation, route }) => {
  const { name, image, description, price, rating, food } = route.params;
  const Food = food;
  const [count, setCount] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {imageLoaded && (
        <View style={tw`w-full  h-[400px] justify-center items-center`}>
          <ActivityIndicator size="small" color="#ff0000" />
        </View>
      )}
      <Image
        onLoadEnd={() => {
          setImageLoaded(false);
        }}
        source={{ uri: image[0] }}
        style={tw`w-full h-[400px]`}
      />
      <ScrollView style={tw`h-full absolute w-full left-0 top-0 pt-[380px]`}>
        <View
          style={[
            tw`p-3 flex h-full rounded-t-3xl bg-gray-50 pb-[200px] mb-[300px] flex-col`,
            style.shadow,
          ]}
        >
          <View style={tw`flex-row justify-center items-center`}>
            <View style={tw`w-10 p-1 rounded-full bg-gray-800`} />
          </View>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-xl font-bold p-3 pb-0 `}>{name}</Text>
            <Counter count={count} setCount={setCount} />
          </View>
          <View style={tw`flex-row items-center p-1 px-3`}>
            <Stars rating={rating} />
          </View>
          {count != 1 && (
            <Text style={tw`text-base font-bold p-3 text-gray-700 py-0 `}>
              {price} dh
            </Text>
          )}
          <Text style={tw`text-2xl font-bold p-3  py-0 `}>
            {price * count} dh
          </Text>
          <Text style={tw`text-xl font-bold p-3 pb-0  pt-6 `}>Description</Text>
          <Text style={tw` text-base p-3 `}>
            {description.replace(/[<p></p>]/gi, "")}
          </Text>
          <View style={tw`w-full`}>
            <ScrollView horizontal style={tw`w-full `}>
              {food?.map((item, index) => (
                <CardFood key={index} {...{ ...item, Food }} isInfo />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <FoodOrder
        price={price * count}
        product={{
          name,
          image,
          description,
          price,
          rating,
        }}
        quantity={count}
      />
    </View>
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
