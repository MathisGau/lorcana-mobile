import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";

export default function Card({ card, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image
        style={styles.cardImage}
        source={{ uri: card.image }}
        placeholder={require("../assets/back.png")}
        transition={500}
        placeholderContentFit="contain"
        contentFit="contain"
      />
      <Text style={styles.cardName}>{card.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  cardImage: {
    width: 180,
    height: 250,
    borderRadius: 10,
  },
  cardName: {
    textAlign: "center",
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});
