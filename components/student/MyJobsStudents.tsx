import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../App"; // Adjust import path if necessary

const MyJobsStudents = ({ route }: { route: any }) => {
  const { email } = route.params; // Get the email parameter from the route
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Jobs</Text>

      {/* Button: Posted Services */}
      <TouchableOpacity
        style={styles.tile}
        onPress={() => navigation.navigate("PostedServices", { email })}
      >
        <Text style={styles.tileText}>Posted Services</Text>
      </TouchableOpacity>

      {/* Button: Requested Jobs */}
      <TouchableOpacity
        style={styles.tile}
        onPress={() => navigation.navigate("RequestedJobs", { email })}
      >
        <Text style={styles.tileText}>View Requested Jobs</Text>
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
    marginBottom: 24,
  },
  tile: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: "80%",
    alignItems: "center",
  },
  tileText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MyJobsStudents;
