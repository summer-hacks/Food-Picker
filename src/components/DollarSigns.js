import React from "react";
import { View } from "react-native";
import Dollar from "./Dollar";

const DollarSigns = ({
  $clicked,
  $$clicked,
  $$$clicked,
  $$$$clicked,
  handle$,
  handle$$,
  handle$$$,
  handle$$$$,
}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      <Dollar dollars="$" clicked={$clicked} handleClick={handle$} />
      <Dollar dollars="$$" clicked={$$clicked} handleClick={handle$$} />
      <Dollar dollars="$$$" clicked={$$$clicked} handleClick={handle$$$} />
      <Dollar dollars="$$$$" clicked={$$$$clicked} handleClick={handle$$$$} />
    </View>
  );
};

export default DollarSigns;
