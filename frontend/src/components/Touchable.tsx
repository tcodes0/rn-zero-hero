import * as React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 17,
    borderColor: "pink",
    borderStyle: "solid",
    padding: 15,
    alignItems: "center",
    fontWeight: "bold",
    backgroundColor: "skyblue",
    fontSize: 18,
    minWidth: 100
  }
});

const Touchable = (props: any) => {
  const { children, style, ...other } = props;
  return (
    <TouchableOpacity
      style={{ ...(styles.touchable as {}), ...style }}
      activeOpacity={0.4}
      {...other}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Touchable;
