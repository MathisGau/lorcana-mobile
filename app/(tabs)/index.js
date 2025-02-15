import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";

const setImage = {
  1: require("../../assets/Premier_Chapitre.png"),
  2: require("../../assets/L'ascension_des_Floodborn.png"),
  3: require("../../assets/Les_terres_d'encres.png"),
  4: require("../../assets/Le_retour_d'ursula.png"),
  5: require("../../assets/Ciel_Scintillant.png"),
  6: require("../../assets/La_mer_azurite.png"),
  7: require("../../assets/L'ile_d'Archazia.png"),
  8: require("../../assets/Le_Règne_de_Jafar.png"),
  9: require("../../assets/Menace_des_profondeurs.png"),
};

export default function App() {
  const [sets, setSets] = useState([]);

  useEffect(() => {
    fetch("https://lorcana.brybry.fr/api/sets", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer 48|ji1UEy4Z28kqsw47UyS7HXEIxi2tPQ0mUg7EF7jp36a42e80",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setSets(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/back.png")}
      style={styles.background}
      blurRadius={6}
    >
      <View style={styles.container}>
        <FlatList
          data={sets}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(set) => set.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={styles.setElement}
              onPress={() => router.push(`/cardList?id=${item.id}`)}
            >
              <Image source={setImage[item.id]} style={styles.setImage} />
              <Text style={styles.setText}>
                {item.code} - {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />

        <StatusBar style="light" />
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
    paddingTop: 110,
  },
  setElement: {
    flexDirection: "row",
    alignItems: "center",
    width: 360,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 8,
    borderRadius: 15,
    borderColor: "#FFD700",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  setImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: "contain",
    marginHorizontal: 6,
  },
  setText: {
    flexWrap: "wrap",
    maxWidth: "80%",
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    paddingHorizontal: 6,
  },
});
