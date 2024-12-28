import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
  },
  tile: {
    backgroundColor: "#FF5733", // Bright orange for tiles
    width: "80%",
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tileText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

    tileEnabled: {
      opacity: 1,
    },
    tileDisabled: {
      opacity: 0.5,
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: "#666",
    },
  
});

export default styles;
