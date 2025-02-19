import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { isCardInWishlist, toggleWishlistCard } from "../utils/storageServices";

export default function WishlistButton({ cardId }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cardId || typeof cardId !== "number") {
      console.error("❌ Erreur : cardId invalide dans WishlistButton", cardId);
      return;
    }

    const checkWishlist = async () => {
      setLoading(true);
      const inWishlist = await isCardInWishlist(cardId);
      setIsInWishlist(inWishlist);
      setLoading(false);
    };

    checkWishlist();
  }, [cardId]);

  const handleToggleWishlist = async () => {
    if (loading) return;

    setLoading(true);
    const previousState = isInWishlist;
    setIsInWishlist(!isInWishlist);

    const result = await toggleWishlistCard(cardId);
    if (!result.success) {
      setIsInWishlist(previousState);
      console.error(
        "❌ Erreur lors de la mise à jour de la wishlist :",
        result.message
      );
    }

    setLoading(false);
  };

  return (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={handleToggleWishlist}
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
