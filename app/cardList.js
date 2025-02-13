import { router } from "expo-router";
import { FlatList, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import SearchBarre from "../components/SearchBarre";
import Card from "../components/Card";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [searchText, setSearchText] = useState("");
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

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/back.png")}
        style={styles.background}
        blurRadius={3}
      />
      <SearchBarre searchText={searchText} setSearchText={setSearchText} />

      <FlatList
        data={filteredCards}
        numColumns={2}
        keyExtractor={(card) => card.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Card
            card={item}
            onPress={() => router.push(`/cardDetail?id=${item.id}`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 110,
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.5,
  },
  listContainer: {
    paddingVertical: 0,
  },
});
