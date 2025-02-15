import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://lorcana.brybry.fr/api";

// 🔹 Inscription utilisateur
export const register = async (email, password, passwordConfirm) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        password_confirmation: passwordConfirm,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Erreur d'inscription :", error);
  }
};

// 🔹 Connexion utilisateur
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.token) {
      await AsyncStorage.setItem("authToken", data.token);
    }
    return data;
  } catch (error) {
    console.error("Erreur de connexion :", error);
  }
};

// 🔹 Déconnexion utilisateur
export const logout = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    await AsyncStorage.removeItem("authToken");
  } catch (error) {
    console.error("Erreur de déconnexion :", error);
  }
};

// 🔹 Récupérer le token stocké
export const getAuthToken = async () => {
  return await AsyncStorage.getItem("authToken");
};
