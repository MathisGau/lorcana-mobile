import { View, StyleSheet } from "react-native";

export default function Separator({ color = "#FFD700", width = "100%" }) {
  return <View style={[styles.separator, { backgroundColor: color, width }]} />;
}

const styles = StyleSheet.create({
  separator: {
    height: 2,
    marginVertical: 15,
  },
});
