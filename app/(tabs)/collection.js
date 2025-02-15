import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import {
  getWishlist,
  removeFromWishlist,
  updateCardCollection,
} from "../../utils/cardServices";

export default function CollectionScreen() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  // 🔹 Récupère la wishlist de l'utilisateur
  const fetchWishlist = async () => {
    setLoading(true);
    const data = await getWishlist();
    if (data && data.data) {
      setWishlist(data.data);
    }
    setLoading(false);
  };

  // 🔹 Supprime une carte de la wishlist
  const handleRemoveCard = async (cardId) => {
    await removeFromWishlist(cardId);
    fetchWishlist();
  };

  // 🔹 Met à jour la quantité possédée d'une carte
  const handleUpdateQuantity = async (cardId, normalQty, foilQty) => {
    await updateCardCollection(cardId, normalQty, foilQty);
    fetchWishlist();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FFD700" />
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />

              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardDetails}>
                  Normal : {item.normal_quantity} | Brillant :{" "}
                  {item.foil_quantity}
                </Text>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleRemoveCard(item.id)}
                >
                  <Text style={styles.buttonText}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 15,
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignItems: "center",
  },
  cardImage: {
    width: 80,
    height: 120,
    borderRadius: 5,
  },
  cardInfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  cardDetails: {
    fontSize: 14,
    color: "#DDD",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
  },
});
