import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { getAccountServices } from "../../utils/authServices";

export default function AccountScreen() {
  const [account, setAccount] = useState(null);

  const handleAccount = useCallback(async () => {
    const response = await getAccountServices();
    if (response) {
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
    <View style={styles.container}>
      <Text style={styles.text}>{account?.name}</Text>
      <Text style={styles.text}>{account?.email}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  text: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
  },
});
