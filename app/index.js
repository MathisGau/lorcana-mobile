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
} from "react-native";

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
      source={require("../assets/back.png")}
      style={styles.background}
      blurRadius={6}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Choisissez un Set</Text>

        <FlatList
          data={sets}
          numColumns={1}
          keyExtractor={(set) => set.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={styles.setElement}
              onPress={() => router.push(`/cardList?id=${item.id}`)}
            >
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
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  setElement: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  setText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
