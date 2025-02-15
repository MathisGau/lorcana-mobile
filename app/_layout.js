import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

export default function RootLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerTitle: () => (
          <View style={styles.headerContainer}>
            <Image
              source={require("../assets/lorcana-logo.png")}
              style={styles.logo}
            />
          </View>
        ),
        headerStyle: {
          backgroundColor: "rgba(0, 0, 0, 0)",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            <TouchableOpacity
              style={styles.GoBackContainer}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={28} color="#FFD700" />
            </TouchableOpacity>
          ) : (
            <View style={styles.emptySpace} />
          ),
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
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
    borderRadius: 10,
  },
  emptySpace: {
    width: 40,
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: "100%",
  },
  logo: {
    height: height * 0.2,
    aspectRatio: 2,
    resizeMode: "contain",
  },
});
