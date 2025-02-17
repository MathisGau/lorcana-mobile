import { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  addCardToCollection,
  removeCardFromCollection,
  isCardInCollection,
} from "../utils/storageServices";

export default function CollectionButton({ card }) {
  const [isInCollection, setIsInCollection] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (card && card.id) {
      checkCollectionStatus();
    }
  }, [card]);

  const checkCollectionStatus = async () => {
    if (!card || !card.id) return;
    const exists = await isCardInCollection(card.id);
    setIsInCollection(exists);
  };

  const handleCollectionToggle = async () => {
    if (loading || !card || !card.id) {
      return;
    }

    setLoading(true);

    if (isInCollection) {
      await removeCardFromCollection(card.id);
    } else {
      await addCardToCollection(card);
    }

    await checkCollectionStatus();
    setLoading(false);
  };

  return (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={handleCollectionToggle}
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
