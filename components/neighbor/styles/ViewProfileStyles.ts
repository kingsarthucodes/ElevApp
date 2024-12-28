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
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  profileDetail: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#555",
  },
  value: {
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f9f9f9",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  saveButton: {
    backgroundColor: "#007BFF", // Blue button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
});

export default styles;
