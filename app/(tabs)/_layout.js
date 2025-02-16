import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const { height } = Dimensions.get("window");

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#FFD700",
        tabBarInactiveTintColor: "gray",
        headerTransparent: true,
        headerTitleAlign: "center",
        headerTitle: () => (
          <Image
            source={require("../../assets/lorcana-logo.png")}
            style={styles.logo}
          />
        ),
        headerStyle: {
          backgroundColor: "rgba(0, 0, 0, 0)",
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmarks" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "black",
    borderTopColor: "#FFD700",
    height: 80,
    paddingTop: 5,
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
