import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  isCardInCollection,
  toggleCollectionCard,
} from "../utils/storageServices";

export default function CollectionButton({ cardId }) {
  const [isInCollection, setIsInCollection] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cardId || typeof cardId !== "number") {
      console.error(
        "❌ Erreur : cardId invalide dans CollectionButton",
        cardId
      );
      return;
    }

    const checkCollection = async () => {
      setLoading(true);
      const inCollection = await isCardInCollection(cardId);
      setIsInCollection(inCollection);
      setLoading(false);
    };

    checkCollection();
  }, [cardId]);

  const handleToggleCollection = async () => {
    if (loading) return;

    setLoading(true);
    const previousState = isInCollection;
    setIsInCollection(!isInCollection);

    const result = await toggleCollectionCard(cardId);
    if (!result.success) {
      setIsInCollection(previousState);
      console.error(
        "❌ Erreur lors de la mise à jour de la collection :",
        result.message
      );
    }

    setLoading(false);
  };

  return (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={handleToggleCollection}
      disabled={loading}
    >
      <Ionicons
        name={isInCollection ? "bookmarks" : "bookmarks-outline"}
        size={36}
        color={isInCollection ? "#FFD700" : "#FFF"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    top: 190,
    right: 15,
    zIndex: 10,
  },
});
