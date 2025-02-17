import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { registerServices } from "../utils/authServices";
import { useCallback, useState } from "react";

export default function RegisterScreen() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleRegister = useCallback(
    async (name, email, password, passwordConfirm) => {
      const response = await registerServices(
        name,
        email,
        password,
        passwordConfirm
      );
      console.log(response);
      if (response.message) {
        setMessage(response.message);
      }
      if (response.user) {
        router.replace("/login");
      }
    },
    []
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmation du mot de passe"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          handleRegister(name, email, password, passwordConfirmation)
        }
      >
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.link}>Déjà un compte ? Se connecter</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  link: {
    color: "#FFD700",
    marginTop: 10,
  },
});
