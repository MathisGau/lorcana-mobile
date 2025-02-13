import { Link, router } from "expo-router";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image } from "expo-image";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    fetch(`https://lorcana.brybry.fr/api/sets/${id}/cards`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer 48|ji1UEy4Z28kqsw47UyS7HXEIxi2tPQ0mUg7EF7jp36a42e80",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/back.png")}
        style={styles.background}
        blurRadius={3}
      />

      <FlatList
        data={cards}
        numColumns={2}
        keyExtractor={(card) => card.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => router.push(`/cardDetail?id=${item.id}`)}
            style={styles.card}
          >
            <Image
              style={styles.cardImage}
              source={{ uri: item.image }}
              placeholder={require("../assets/back.png")}
              transition={500}
              placeholderContentFit="contain"
              contentFit="contain"
            />
            <Text style={styles.cardName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.3,
  },
  listContainer: {
    paddingVertical: 20,
  },
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
