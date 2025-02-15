import { getAuthToken } from "./authServices";

const API_URL = "https://lorcana.brybry.fr/api";

// 🔹 Mettre à jour les cartes possédées
export const updateCardCollection = async (cardId, normalQty, foilQty) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}/me/${cardId}/update-owned`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        normal: normalQty,
        foil: foilQty,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Erreur de mise à jour de la collection :", error);
  }
};

// 🔹 Ajouter une carte à la wishlist
export const addToWishlist = async (cardId) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}/wishlist/${cardId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Erreur d'ajout à la wishlist :", error);
  }
};

// 🔹 Retirer une carte de la wishlist
export const removeFromWishlist = async (cardId) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}/wishlist/${cardId}/remove`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Erreur de suppression de la wishlist :", error);
  }
};

// 🔹 Récupérer la wishlist de l'utilisateur
export const getWishlist = async () => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}/wishlist`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Erreur de récupération de la wishlist :", error);
  }
};
