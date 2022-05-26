import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import ColorPicker from "react-native-wheel-color-picker";

export default function Cart() {
  const [color, setColor] = React.useState("#000000");
  return (
    <View style={[tw`flex-1 flex-col  items-center`]}>
      <Text style={[tw`text-2xl font-black my-6 `]}>My Lamp color</Text>
      <View
        style={[
          tw` flex-col items-center w-[60px] rounded mb-1 h-[20px]`,
          { backgroundColor: color },
        ]}
      />
      <View
        style={[
          tw` flex-col items-center w-[60px] rounded h-[100px]`,
          { backgroundColor: color },
        ]}
      />
      

      <View
        style={tw`flex-row pb-7 justify-between items-center w-full rounded-t-3xl bg-white absolute bottom-0 p-5 z-50 `}
      >
        <ColorPicker
          onColorSelected={(color) => {
            setColor(color);
            console.log(color);
          }}
          onColorChangeComplete={(color) => {
            setColor(color);
          }}
        />
      </View>
    </View>
  );
}
