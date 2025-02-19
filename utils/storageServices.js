import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://lorcana.brybry.fr/api";

const fetchWithAuth = async (endpoint, method = "GET", body = null) => {
  const token = await AsyncStorage.getItem("userToken");
  if (!token) {
    console.error("❌ No token available");
    return null;
  }

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const requestOptions = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      console.error(`⚠️ Erreur API (${endpoint}):`, data);
      return null;
    }

    return data;
  } catch (error) {
    console.error("❌ API Error:", error);
    return null;
  }
};

// Wishlist
export const getWishlistCardIds = async () => {
  const wishlist = await fetchWithAuth("wishlist");
  if (!wishlist || !wishlist.data) return [];
  return wishlist.data.map((card) => card.id) || [];
};

export const isCardInWishlist = async (cardId) => {
  const wishlist = await getWishlistCardIds();
  return wishlist.includes(cardId);
};

export const toggleWishlistCard = async (cardId) => {
  if (typeof cardId !== "number") {
    console.warn("❌ Erreur : cardId n'est pas un nombre valide.");
    return { success: false, message: "ID de carte invalide." };
  }

  const inWishlist = await isCardInWishlist(cardId);
  console.log(
    `🔄 Toggling wishlist status for card ${cardId}. Current: ${inWishlist}`
  );

  if (inWishlist) {
    const response = await fetchWithAuth("wishlist/remove", "POST", {
      card_id: cardId,
    });
    if (response) {
      console.log(`✅ Carte ${cardId} retirée de la wishlist`);
      return {
        success: true,
        message: "Carte retirée de la wishlist",
        inWishlist: false,
      };
    }
  } else {
    const response = await fetchWithAuth("wishlist/add", "POST", {
      card_id: cardId,
    });
    if (response) {
      console.log(`✅ Carte ${cardId} ajoutée à la wishlist`);
      return {
        success: true,
        message: "Carte ajoutée à la wishlist",
        inWishlist: true,
      };
    }
  }
  return {
    success: false,
    message: "Erreur lors de la mise à jour de la wishlist",
  };
};

// Collection
export const getCollectionCardIds = async () => {
  const collection = await fetchWithAuth("me/cards");
  if (!collection || !collection.data) return [];
  return collection.data.map((card) => card.id) || [];
};

export const isCardInCollection = async (cardId) => {
  const collection = await getCollectionCardIds();
  return collection.includes(cardId);
};

export const toggleCollectionCard = async (cardId) => {
  if (typeof cardId !== "number") {
    console.warn("❌ Erreur : cardId n'est pas un nombre valide.");
    return { success: false, message: "ID de carte invalide." };
  }

  const inCollection = await isCardInCollection(cardId);
  console.log(
    `🔄 Toggling collection status for card ${cardId}. Current: ${inCollection}`
  );

  const response = await fetchWithAuth(`me/${cardId}/update-owned`, "POST", {
    normal: inCollection ? 0 : 1,
    foil: inCollection ? 0 : 1,
  });

  if (response && response.message === "Card updated successfully.") {
    console.log(
      `✅ Carte ${cardId} ${
        inCollection ? "retirée de" : "ajoutée à"
      } la collection`
    );
    return {
      success: true,
      message: `Carte ${
        inCollection ? "retirée de" : "ajoutée à"
      } votre collection`,
      inCollection: !inCollection,
    };
  }

  console.error("❌ Erreur lors de la mise à jour de la collection");
  return {
    success: false,
    message: "Erreur lors de la mise à jour de la collection",
  };
};

// Fetch Card Details
export const fetchCardDetails = async (cardId) => {
  if (!cardId) return null;
  return await fetchWithAuth(`cards/${cardId}`);
};

// Fetch Sets and Cards
export const fetchSets = async () => await fetchWithAuth("sets");

export const fetchCards = async (setId) => {
  if (!setId) return [];
  return await fetchWithAuth(`sets/${setId}/cards`);
};
