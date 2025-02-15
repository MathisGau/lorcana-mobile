import { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { addToWishlist, removeFromWishlist } from "../utils/cardServices";

export default function WishlistButton({ cardId, isInWishlist, onUpdate }) {
  const [loading, setLoading] = useState(false);

  const handleWishlistToggle = async () => {
    if (loading) return;
    setLoading(true);

    if (isInWishlist) {
      await removeFromWishlist(cardId);
    } else {
      await addToWishlist(cardId);
    }

    onUpdate();
    setLoading(false);
  };

  return (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={handleWishlistToggle}
    >
      <Ionicons
        name={isInWishlist ? "heart" : "heart-outline"}
        size={38}
        color={isInWishlist ? "#FF4F4F" : "#FFF"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    top: 130,
    right: 15,
    zIndex: 10,
  },
});
