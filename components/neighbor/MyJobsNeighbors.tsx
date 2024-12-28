import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../App"; // Adjust based on your file structure

type MyJobsNeighborsNavigationProp = StackNavigationProp<RootStackParamList, "MyPostedJobs">;

const MyJobsNeighbors = ({ route }: any) => {
  const { email } = route.params; // Get email from route params
  const navigation = useNavigation<MyJobsNeighborsNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Jobs</Text>

      {/* Button: Requested Services */}
      <TouchableOpacity
        style={styles.tile}
        onPress={() =>
          navigation.navigate("RequestList", {
            email, // Pass email to the RequestList screen
          })
        }
      >
        <Text style={styles.tileText}>Requested Services</Text>
      </TouchableOpacity>

      {/* Button: My Posted Jobs */}
      <TouchableOpacity
        style={styles.tile}
        onPress={() =>
          navigation.navigate("MyPostedJobs", {
            email, // Pass email to the MyPostedJobs screen
          })
        }
      >
        <Text style={styles.tileText}>My Posted Jobs</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    textAlign: "center",
    color: "#333",
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
});

export default MyJobsNeighbors;
