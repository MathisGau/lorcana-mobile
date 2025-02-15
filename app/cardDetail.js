import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Image } from "expo-image";
import Separator from "../components/Separator";
import WishlistButton from "../components/WishlistButton";
import CollectionButton from "../components/CollectionButton";

const rarityImages = {
  Commune: require("../assets/Common.png"),
  Inhabituelle: require("../assets/Uncommon.png"),
  Rare: require("../assets/Rare.png"),
  "Très Rare": require("../assets/Super_Rare.png"),
  Légendaire: require("../assets/Legendary.png"),
  Enchanter: require("../assets/Enchanted.png"),
};

export default function CardDetail() {
  const { id } = useLocalSearchParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCardDetails = () => {
    setLoading(true);
    fetch(`https://lorcana.brybry.fr/api/cards/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer 48|ji1UEy4Z28kqsw47UyS7HXEIxi2tPQ0mUg7EF7jp36a42e80",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setCard(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCardDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  if (!card) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Carte introuvable</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WishlistButton
        cardId={card.id}
        isInWishlist={card.is_in_wishlist}
        onUpdate={fetchCardDetails}
      />

      <CollectionButton
        cardId={card.id}
        normalQty={card.normal_quantity}
        foilQty={card.foil_quantity}
        onUpdate={fetchCardDetails}
      />
      <Image
        source={{ uri: card.image }}
        placeholder={require("../assets/back.png")}
        transition={{ type: "fade", duration: 800 }}
        style={styles.backgroundImage}
        blurRadius={8}
      />

      <View style={styles.cardContainer}>
        <Image
          source={{ uri: card.image }}
          style={styles.cardImage}
          placeholder={require("../assets/back.png")}
          transition={{ type: "fade", duration: 800 }}
          placeholderContentFit="contain"
          contentFit="contain"
        />
      </View>

      <View style={styles.cardInfo}>
        <View style={styles.descriptionHeader}>
          <Text style={styles.cardName} numberOfLines={2}>
            {card.name}
          </Text>
          <View style={styles.rarityContainer}>
            <Image
              source={rarityImages[card.rarity]}
              style={styles.rarityImage}
            />
            <Text style={styles.cardDetails}>{card.rarity}</Text>
          </View>
        </View>
        <Text style={styles.cardDetails}>Histoire: {card.story}</Text>
        <Separator />
        <Text style={styles.cardDescription}>{card.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.3,
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 120,
  },
  cardImage: {
    width: 300,
    height: 400,
  },
  descriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardInfo: {
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 12,
    width: "100%",
    flexGrow: 1,
  },
  cardName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 5,
    maxWidth: "80%",
  },
  rarityContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginBottom: 10,
  },
  rarityImage: {
    width: 32,
    height: 32,
    contentFit: "contain",
  },
  cardDescription: {
    fontSize: 16,
    color: "#DDD",
    textAlign: "left",
    marginVertical: 10,
  },
  cardDetails: {
    fontSize: 16,
    color: "white",
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});
