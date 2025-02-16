import AsyncStorage from "@react-native-async-storage/async-storage";

const COLLECTION_KEY = "collection";
const WISHLIST_KEY = "wishlist";

export const addCardToCollection = async (card) => {
  try {
    const collection = await getCollection();
    const updatedCollection = [...collection, card];
    await AsyncStorage.setItem(
      COLLECTION_KEY,
      JSON.stringify(updatedCollection)
    );
    return updatedCollection;
  } catch (error) {
    console.error("Erreur lors de l'ajout à la collection :", error);
  }
};

export const removeCardFromCollection = async (cardId) => {
  try {
    const collection = await getCollection();
    const updatedCollection = collection.filter((card) => card.id !== cardId);
    await AsyncStorage.setItem(
      COLLECTION_KEY,
      JSON.stringify(updatedCollection)
    );
    return updatedCollection;
  } catch (error) {
    console.error("Erreur lors de la suppression de la carte :", error);
  }
};

export const isCardInCollection = async (cardId) => {
  try {
    const collection = await getCollection();
    return collection.some((card) => card.id === cardId);
  } catch (error) {
    console.error("Erreur lors de la vérification de la carte :", error);
    return false;
  }
};

export const getCollection = async () => {
  try {
    const storedCollection = await AsyncStorage.getItem(COLLECTION_KEY);
    return storedCollection ? JSON.parse(storedCollection) : [];
  } catch (error) {
    console.error("Erreur lors de la récupération de la collection :", error);
    return [];
  }
};

export const addCardToWishlist = async (card) => {
  try {
    const wishlist = await getWishlist();
    const updatedWishlist = [...wishlist, card];
    await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
    return updatedWishlist;
  } catch (error) {
    console.error("Erreur lors de l'ajout à la wishlist :", error);
  }
};

export const removeCardFromWishlist = async (cardId) => {
  try {
    const wishlist = await getWishlist();
    const updatedWishlist = wishlist.filter((card) => card.id !== cardId);
    await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
    return updatedWishlist;
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de la carte de la wishlist :",
      error
    );
  }
};

export const isCardInWishlist = async (cardId) => {
  try {
    const wishlist = await getWishlist();
    return wishlist.some((card) => card.id === cardId);
  } catch (error) {
    console.error("Erreur lors de la vérification de la wishlist :", error);
    return false;
  }
};

export const getWishlist = async () => {
  try {
    const storedWishlist = await AsyncStorage.getItem(WISHLIST_KEY);
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  } catch (error) {
    console.error("Erreur lors de la récupération de la wishlist :", error);
    return [];
  }
};

export const resetCollection = async () => {
  try {
    await AsyncStorage.removeItem(COLLECTION_KEY);
  } catch (error) {
    console.error(
      "Erreur lors de la réinitialisation de la collection :",
      error
    );
  }
};

export const resetWishlist = async () => {
  try {
    await AsyncStorage.removeItem(WISHLIST_KEY);
  } catch (error) {
    console.error("Erreur lors de la réinitialisation de la wishlist :", error);
  }
};
