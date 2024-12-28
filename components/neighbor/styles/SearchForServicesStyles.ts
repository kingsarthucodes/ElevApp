import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#f7f7f7",
  },
  filterButton: {
    backgroundColor: "#4CAF50", // Green shade for filter button
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  filterButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  jobItem: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 2, // Add shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  jobDescription: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  jobDetails: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  jobServices: {
    fontSize: 14,
    color: "#777",
    marginTop: 8,
  },
  viewButton: {
    marginTop: 12,
    backgroundColor: "#007bff", // Blue shade for the View Service button
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  searchButton: {
    backgroundColor: "#4CAF50", // Same green as filterButton
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
