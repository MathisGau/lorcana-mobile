import { router } from "expo-router";
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import SearchBarre from "../components/SearchBarre";
import Card from "../components/Card";
import { fetchCards } from "../utils/APIServices";
import { Ionicons } from "@expo/vector-icons";
import { Modal } from "react-native";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("id");
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const getCards = async () => {
      const data = await fetchCards(id);
      setCards(data);
    };

    getCards();
  }, [id]);

  const sortedCards = [...cards].sort((a, b) => {
    if (sortOption === "id") return a.id - b.id;
    if (sortOption === "name") return a.name.localeCompare(b.name);
    if (sortOption === "rarity") return a.rarity.localeCompare(b.rarity);
    return 0;
  });

  const filteredCards = sortedCards.filter((card) =>
    card.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/back.png")}
        style={styles.background}
        blurRadius={3}
      />
      {/* <View style={styles.searchContainer}> */}
      <SearchBarre
        searchText={searchText}
        setSearchText={setSearchText}
        style={styles.searchBar}
      />
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="filter" size={28} color="#FFD700" />
      </TouchableOpacity>
      {/* </View> */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Trier par :</Text>
            <TouchableOpacity
              style={styles.modalOptionButton}
              onPress={() => {
                setSortOption("id");
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalOption}>Par Défaut</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOptionButton}
              onPress={() => {
                setSortOption("name");
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalOption}>Nom</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOptionButton}
              onPress={() => {
                setSortOption("rarity");
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalOption}>Rareté</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalClose}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    justifyContent: "center",
    backgroundColor: "#333",
  },
  searchBar: {
    flex: 1,
    height: 40,
    width: "100%",
    borderRadius: 20,
    backgroundColor: "#222",
    paddingHorizontal: 0,
    color: "#FFF",
    fontSize: 16,
  },
  filterButton: {
    padding: 10,
    position: "absolute",
    top: 107,
    right: 30,
  },
  listContainer: {
    paddingVertical: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    backgroundColor: "#333",
    padding: 25,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 15,
  },
  modalOptionButton: {
    backgroundColor: "#444",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  modalOption: {
    fontSize: 18,
    color: "#FFF",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalClose: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});
