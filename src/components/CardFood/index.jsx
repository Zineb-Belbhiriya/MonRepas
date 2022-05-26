import React, { useState } from "react";
import { Dimensions } from "react-native";
import {
  Pressable,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import tw from "twrnc";

export const CardFood = ({
  name,
  image,
  isFav,
  price,
  rating,
  description,
  Food,
  isInfo = false,
}) => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const [imageLoaded, setImageLoaded] = useState(true);

  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("FoodInfo", {
          name: name,
          image: image,
          isFav: isFav,
          price: price,
          rating: rating,
          description: description,
          food: Food,
        });
      }}
      style={[
        tw`p-3 bg-red-600 ${
          !isInfo ? "" : "max-w-[300px]"
        } items-center  m-1 w-full rounded-lg bg-white my-2`,
        style.shadow,
      ]}
    >
      <View style={tw`w-full h-[110px]`}>
        {imageLoaded && (
          <View
            style={tw`w-full bg-gray-50 rounded h-full justify-center items-center`}
          >
            <ActivityIndicator size="small" color="#ff0000" />
          </View>
        )}
        <Image
          source={{
            uri: image[0],
          }}
          onLoad={() => {
            setImageLoaded(false);
          }}
          style={tw`w-full h-full rounded-lg`}
        />
      </View>

      <View style={tw`flex-row items-center w-full p-2`}>
        <Image
          source={{
            uri: image[0],
          }}
          style={tw`w-10 h-10 bg-gray-200 rounded-full`}
        />
        <View style={tw`flex-1 ml-3 w-full p-2`}>
          <Text style={tw`text-2xl capitalize font-bold`}>{name}</Text>
          <Text style={tw`text-xl `}>{price} Dh</Text>
        </View>
      </View>
      <View
        style={tw`absolute top-2 right-2 flex-row items-center justify-center`}
      >
        <TouchableOpacity
          style={tw`bg-white rounded-full px-2 py-1`}
          onPress={() => {
            dispatch(
              addToCart({
                product: {
                  name: name,
                  image: image,
                  price: price,
                },
                quantity: 1,
              })
            );
          }}
        >
          <Ionicons name="add" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
