import { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  addCardToWishlist,
  removeCardFromWishlist,
  isCardInWishlist,
} from "../utils/storageServices";

export default function WishlistButton({ card }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (card && card.id) {
      checkWishlistStatus();
    }
  }, [card]);

  const checkWishlistStatus = async () => {
    if (!card || !card.id) return;
    const exists = await isCardInWishlist(card.id);
    setIsInWishlist(exists);
  };

  const handleWishlistToggle = async () => {
    if (loading || !card || !card.id) return;
    setLoading(true);

    if (isInWishlist) {
      await removeCardFromWishlist(card.id);
    } else {
      await addCardToWishlist(card);
    }

    await checkWishlistStatus();
    setIsInWishlist(!isInWishlist);
    setLoading(false);
  };

  return (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={handleWishlistToggle}
      disabled={loading}
    >
      <Ionicons
        name={isInWishlist ? "heart" : "heart-outline"}
        size={36}
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
