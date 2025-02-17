import { router } from "expo-router";
import { FlatList, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import SearchBarre from "../components/SearchBarre";
import Card from "../components/Card";
import { fetchCards } from "../utils/APIServices";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const getCards = async () => {
      const data = await fetchCards(id);
      setCards(data);
    };

    getCards();
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
