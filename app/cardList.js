import { useFocusEffect, useLocalSearchParams, router } from "expo-router";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Image } from "expo-image";
import SearchBarre from "../components/SearchBarre";
import Card from "../components/Card";
import {
  getCollectionCardIds,
  getWishlistCardIds,
} from "../utils/storageServices";
import { fetchCards } from "../utils/APIServices";
import { Ionicons } from "@expo/vector-icons";
import FilterModal from "../components/FilterModal";

export default function CardList() {
  const { id } = useLocalSearchParams();
  const [cards, setCards] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("id");
  const [filterOption, setFilterOption] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [collectionIds, setCollectionIds] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  const getCards = useCallback(async () => {
    if (!id) return;
    try {
      const data = await fetchCards(id);
      setCards(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des cartes :", error);
    }
  }, [id]);

  const getFilters = useCallback(async () => {
    try {
      const collected = await getCollectionCardIds();
      const wishlist = await getWishlistCardIds();
      setCollectionIds(collected);
      setWishlistIds(wishlist);
    } catch (error) {
      console.error("Erreur lors de la récupération des filtres :", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      getCards();
      getFilters();
    }, [getCards, getFilters])
  );

  const sortedCards = [...cards].sort((a, b) => {
    if (sortOption === "id") return a.id - b.id;
    if (sortOption === "name") return a.name.localeCompare(b.name);
    if (sortOption === "rarity") return a.rarity.localeCompare(b.rarity);
    return 0;
  });

  const filteredCards = sortedCards.filter((card) => {
    const matchesSearch = card.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    if (filterOption === "collection")
      return matchesSearch && collectionIds.includes(card.id);
    if (filterOption === "wishlist")
      return matchesSearch && wishlistIds.includes(card.id);
    if (filterOption !== "all")
      return matchesSearch && card.rarity === filterOption;

    return matchesSearch;
  });

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/back.png")}
        style={styles.background}
        blurRadius={3}
      />
      <View style={styles.searchContainer}>
        <SearchBarre searchText={searchText} setSearchText={setSearchText} />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="filter" size={28} color="#FFD700" />
        </TouchableOpacity>
      </View>

      <FilterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        sortOption={sortOption}
        setSortOption={setSortOption}
        filterOption={filterOption}
        setFilterOption={setFilterOption}
      />

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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  filterButton: {
    padding: 10,
    position: "absolute",
    top: -5,
    right: 20,
  },
  listContainer: {
    paddingVertical: 0,
  },
});
