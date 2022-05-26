import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import ColorPicker from "react-native-wheel-color-picker";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../app/features/cart/cartSlice";

export default function CartShop() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [color, setColor] = React.useState("#000000");

  return (
    <ScrollView style={[tw``]}>
      <View style={[tw`w-full flex-row  justify-between px-3`]}>
        <Text style={[tw`text-2xl font-black my-6 `]}>My Cart</Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(clearCart());
          }}
        >
          <Text style={[tw`text-2xl font-black my-6 `]}>Clear</Text>
        </TouchableOpacity>
        <Text style={[tw`text-2xl font-black my-6 `]}>{cart.total} dh</Text>
      </View>

      <View style={[tw`w-full justify-between px-3`]}>
        {cart.cart.map((item, index) => (
          <View
            key={index}
            style={[
              tw`flex-row mb-5 p-3 justify-between items-center items-center w-full rounded-xl bg-white`,
            ]}
          >
            <Image
              style={[tw`w-10 h-10 rounded-full bg-gray-200`]}
              source={{
                uri: item.image[0],
              }}
            />
            <View
              style={[
                tw`flex-row p-3 justify-between items-center items-center flex-1 rounded-xl bg-white`,
              ]}
            >
              <Text style={[tw`text-2xl font-black`]}>
                {item.name} × {item.quantity}
              </Text>
              <Text style={[tw`text-2xl font-black`]}>
                {item.price * item.quantity} dh
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
