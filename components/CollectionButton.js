import { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { updateCardCollection } from "../utils/cardServices";

export default function CollectionButton({
  cardId,
  normalQty,
  foilQty,
  onUpdate,
}) {
  const [loading, setLoading] = useState(false);
  const isInCollection = normalQty > 0 || foilQty > 0;

  const handleCollectionToggle = async () => {
    if (loading) return;
    setLoading(true);

    if (isInCollection) {
      await updateCardCollection(cardId, 0, 0);
    } else {
      await updateCardCollection(cardId, 1, 0);
    }

    onUpdate();
    setLoading(false);
  };

  return (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={handleCollectionToggle}
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
