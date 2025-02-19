import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import Separator from "../components/Separator";
import WishlistButton from "../components/WishlistButton";
import CollectionButton from "../components/CollectionButton";
import { fetchCardDetails } from "../utils/APIServices";

const rarityImages = {
  Commune: require("../assets/Common.png"),
  Inhabituelle: require("../assets/Uncommon.png"),
  Rare: require("../assets/Rare.png"),
  "Très Rare": require("../assets/Super_Rare.png"),
  Légendaire: require("../assets/Legendary.png"),
  Enchanter: require("../assets/Enchanted.png"),
};

export default function CardDetail() {
  const params = useLocalSearchParams();
  const id = Number(params.id);

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (isNaN(id)) {
        console.error("ID invalide:", id);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchCardDetails(id);
        setCard(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la carte:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  if (!card || !card.id) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Carte introuvable</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WishlistButton cardId={card.id} />
      <CollectionButton cardId={card.id} />

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
        <ScrollView>
          <Text style={styles.cardDescription}>{card.description}</Text>
        </ScrollView>
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
