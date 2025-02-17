import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import {
  getCollection,
  removeCardFromCollection,
  collectionEvents,
} from "../../utils/storageServices";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Collection() {
  const [collection, setCollection] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadCollection();
  }, []);

  const loadCollection = async () => {
    const storedCollection = await getCollection();

    if (storedCollection && storedCollection.length > 0) {
      const validCollection = storedCollection.filter(
        (card) => card && card.id
      );
      setCollection(validCollection);
    } else {
      console.warn("Aucune carte trouvée dans AsyncStorage.");
      setCollection([]);
    }
  };

  const handleRemoveCard = async (cardId) => {
    const updatedCollection = await removeCardFromCollection(cardId);
    setCollection(updatedCollection);
  };

  return (
    <View style={styles.container}>
      {collection.length === 0 ? (
        <Text style={styles.emptyText}>
          Aucune carte dans votre collection.
        </Text>
      ) : (
        <FlatList
          data={collection}
          numColumns={2}
          keyExtractor={(card) => card.id.toString()}
          renderItem={({ item }) =>
            item ? (
              <View style={styles.cardWrapper}>
                <TouchableOpacity
                  style={styles.cardContainer}
                  onPress={() => router.push(`/cardDetail?id=${item.id}`)}
                >
                  <Image
                    style={styles.cardImage}
                    source={{ uri: item.image }}
                  />
                  <Text style={styles.cardName}>{item.name}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleRemoveCard(item.id)}
                >
                  <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity> */}
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 20,
  },
  emptyText: {
    color: "#DDD",
    fontSize: 16,
    marginTop: 20,
  },
  cardWrapper: {
    position: "relative",
    margin: 10,
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 10,
    padding: 10,
  },
  cardImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
  },
  cardName: {
    textAlign: "center",
    color: "#FFD700",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    padding: 5,
  },
});
