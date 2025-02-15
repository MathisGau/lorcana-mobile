import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { getAuthToken, logout } from "../../utils/authServices";

export default function AccountScreen() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 🔹 Récupère les informations de l'utilisateur
  const fetchUserInfo = async () => {
    setLoading(true);
    const token = await getAuthToken();
    if (token) {
      setUserInfo({ email: "exemple@user.com" }); // Placeholder (adapter si un endpoint existe)
    }
    setLoading(false);
  };

  // 🔹 Déconnexion de l'utilisateur
  const handleLogout = async () => {
    await logout();
    // Rediriger vers la page de connexion si nécessaire
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Compte</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#FFD700" />
      ) : (
        <>
          <Text style={styles.userInfo}>Email : {userInfo?.email}</Text>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Se Déconnecter</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 20,
  },
  userInfo: {
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
