import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Image } from "expo-image";

export default function CardDetail() {
  const { id } = useLocalSearchParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <Image
        source={{ uri: card.image }}
        placeholder={require("../assets/back.png")}
        transition={{ type: "fade", duration: 800 }}
        style={styles.backgroundImage}
        blurRadius={10}
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

      {/* Détails de la carte */}
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{card.name}</Text>
        <Text style={styles.cardType}>{card.type}</Text>
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
  },
  cardImage: {
    width: 300,
    height: 400,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  cardInfo: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 10,
    marginHorizontal: 20,
  },
  cardName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 5,
  },
  cardType: {
    fontSize: 18,
    color: "#FFF",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: "#DDD",
    textAlign: "center",
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
