import { TextInput, StyleSheet } from "react-native";

export default function SearchBarre({ searchText, setSearchText }) {
  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Rechercher..."
      placeholderTextColor="#999"
      value={searchText}
      onChangeText={setSearchText}
    />
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    backgroundColor: "#222",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    marginHorizontal: 30,
    color: "#fff",
  },
});
