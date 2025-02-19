import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://lorcana.brybry.fr/api";

const fetchWithAuth = async (endpoint, method = "GET") => {
  const token = await AsyncStorage.getItem("userToken");
  if (!token) throw new Error("No token available");

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const fetchSets = async () => {
  try {
    const data = await fetchWithAuth("sets");
    return data.data;
  } catch (error) {
    console.error("Error fetching sets:", error);
    return [];
  }
};

export const fetchCards = async (id) => {
  if (!id) return [];
  try {
    const data = await fetchWithAuth(`sets/${id}/cards`);
    return data.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    return [];
  }
};

export const fetchCardDetails = async (cardId) => {
  if (!cardId) return null;
  try {
    const data = await fetchWithAuth(`cards/${cardId}`);
    return data.data || null;
  } catch (error) {
    console.error("Error fetching card details:", error);
    return null;
  }
};
