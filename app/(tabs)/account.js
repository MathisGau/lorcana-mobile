import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { getAccountServices } from "../../utils/authServices";

export default function AccountScreen() {
  const [account, setAccount] = useState(null);

  const handleAccount = useCallback(async () => {
    const response = await getAccountServices();
    if (response) {
      console.log("🔐 Account data:", response);
      setAccount(response);
    }
  }, []);

  const handleLogout = useCallback(() => {
    AsyncStorage.removeItem("userToken");
    router.replace("/login");
  }, []);

  useEffect(() => {
    handleAccount();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/back.png")}
      style={styles.background}
      blurRadius={8}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Mon Compte</Text>
        <View style={styles.accountBox}>
          <Text style={styles.label}>Nom :</Text>
          <Text style={styles.text}>{account?.name || "Non défini"}</Text>
          <Text style={styles.label}>Email :</Text>
          <Text style={styles.text}>{account?.email || "Non défini"}</Text>
          <Text style={styles.label}>Date de création :</Text>
          <Text style={styles.text}>
            {account?.created_at
              ? new Date(account.created_at).toLocaleDateString()
              : "Non défini"}
          </Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 30,
  },
  accountBox: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: "80%",
    marginBottom: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#FF4F4F",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
