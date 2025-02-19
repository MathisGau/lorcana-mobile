import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const rarities = [
  "all",
  "Commune",
  "Inhabituelle",
  "Rare",
  "Très Rare",
  "Légendaire",
  "Enchanter",
];

export default function FilterModal({
  modalVisible,
  setModalVisible,
  sortOption,
  setSortOption,
  filterOption,
  setFilterOption,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Trier par :</Text>
          {["id", "name", "rarity"].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.modalOptionButton,
                sortOption === option && styles.selectedOption,
              ]}
              onPress={() => {
                setSortOption(option);
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalOption}>
                {option === "id"
                  ? "Par Défaut"
                  : option.charAt(0).toUpperCase() + option.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.modalTitle}>Filtrer :</Text>
          {rarities.map((rarity) => (
            <TouchableOpacity
              key={rarity}
              style={[
                styles.modalOptionButton,
                filterOption === rarity && styles.selectedOption,
              ]}
              onPress={() => {
                setFilterOption(rarity);
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalOption}>
                {rarity === "all" ? "Tous" : rarity}{" "}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalClose}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    backgroundColor: "#333",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    width: "80%",
    gap: 5,
    alignItems: "center",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFD700",
    marginVertical: 5,
  },
  modalOptionButton: {
    backgroundColor: "#444",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#FFD700",
  },
  modalOption: {
    fontSize: 18,
    color: "#FFF",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalClose: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});
