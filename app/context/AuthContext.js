import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  login as apiLogin,
  logout as apiLogout,
} from "../../utils/authServices";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifier si un token est déjà stocké
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("authToken");
      setUserToken(token);
      setLoading(false);
    };
    checkLoginStatus();
  }, []);

  // Connexion
  const login = async (email, password) => {
    try {
      const data = await apiLogin(email, password);
      if (data.token) {
        await AsyncStorage.setItem("authToken", data.token);
        setUserToken(data.token);
      }
      return data;
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  // Déconnexion
  const logout = async () => {
    try {
      await apiLogout();
      await AsyncStorage.removeItem("authToken");
      setUserToken(null);
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
