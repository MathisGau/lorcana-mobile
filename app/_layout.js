import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function RootLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerTitle: "",
        headerStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerLeft: ({ canGoBack }) => {
          if (canGoBack) {
            return (
              <TouchableOpacity
                style={styles.GoBackContainer}
                onPress={() => router.back()}
              >
                <Text style={styles.GoBackButtun}>Retour</Text>
              </TouchableOpacity>
            );
          } else {
            return null;
          }
        },
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  GoBackContainer: {
    padding: 6,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "yellow",
    borderWidth: 1,
    borderRadius: 10,
  },
  GoBackButtun: {
    color: "yellow",
    fontSize: "18",
  },
});
