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
  collectionEvents,
  getWishlist,
  removeCardFromWishlist,
} from "../../utils/storageServices";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    const storedWishlist = await getWishlist();
    if (storedWishlist) {
      const validWishlist = storedWishlist.filter((card) => card && card.id);
      setWishlist(validWishlist);
    } else {
      setWishlist([]);
    }
  };

  const handleRemoveCard = async (cardId) => {
    await removeCardFromWishlist(cardId);
    loadWishlist();
  };

  return (
    <View style={styles.container}>
      {wishlist.length === 0 ? (
        <Text style={styles.emptyText}>Aucune carte dans votre wishlist.</Text>
      ) : (
        <FlatList
          data={wishlist}
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
