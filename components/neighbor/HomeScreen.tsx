import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NeighborHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Neighbor Home!</Text>
      <Text style={styles.info}>Use the tabs below to navigate.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20, 
    textAlign: "center"
  },
  info: {
    fontSize: 16, 
    textAlign: "center", 
    color: "#555"
  },
});

export default NeighborHomeScreen;
