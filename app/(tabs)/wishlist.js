import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Image } from "expo-image";
import {
  getWishlistCardIds,
  fetchCardDetails,
  toggleWishlistCard,
} from "../../utils/storageServices";
import { useFocusEffect, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadWishlist();
    }, [])
  );

  const loadWishlist = async () => {
    const storedCardIds = await getWishlistCardIds();
    if (storedCardIds?.length > 0) {
      const fetchedCards = await Promise.all(
        storedCardIds.map(async (cardId) => {
          const detailedCard = await fetchCardDetails(cardId);
          return detailedCard?.data || null;
        })
      );
      setWishlist(fetchedCards.filter((card) => card !== null));
    } else {
      console.warn("⚠️ Aucune carte trouvée dans votre wishlist.");
      setWishlist([]);
    }
  };

  const handleRemoveCard = async (cardId) => {
    await toggleWishlistCard(cardId);
    loadWishlist();
  };

  return (
    <ImageBackground
      source={require("../../assets/back.png")}
      style={styles.background}
      blurRadius={6}
    >
      <View style={styles.container}>
        {wishlist.length === 0 ? (
          <Text style={styles.emptyText}>
            Aucune carte dans votre wishlist.
          </Text>
        ) : (
          <FlatList
            data={wishlist}
            numColumns={2}
            keyExtractor={(card) =>
              card?.id ? card.id.toString() : Math.random().toString()
            }
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
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
