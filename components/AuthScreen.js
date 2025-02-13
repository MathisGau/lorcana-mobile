import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function AuthScreen({ type }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async () => {
    try {
      const endpoint = type === "register" ? "register" : "login";
      const body = { email, password };
      if (type === "register") body.confirmPassword = confirmPassword;

      const response = await fetch(
        `https://lorcana.brybry.fr/api/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem("token", data.token);
        router.push("/account");
      } else {
        setError(data.message || "Erreur lors de l'authentification");
      }
    } catch (err) {
      setError("Problème de connexion avec le serveur");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === "register" ? "Inscription" : "Connexion"}
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {type === "register" && (
        <TextInput
          style={styles.input}
          placeholder="Confirmer le mot de passe"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>
          {type === "register" ? "S'inscrire" : "Se connecter"}
        </Text>
      </TouchableOpacity>
      {type === "login" ? (
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.link}>Créer un compte</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.link}>Déjà un compte ? Se connecter</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  title: {
    fontSize: 24,
    color: "#FFD700",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "#222",
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#fff",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  link: {
    color: "#FFD700",
    marginTop: 15,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
