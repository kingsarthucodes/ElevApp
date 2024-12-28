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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: "#FF5733",
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
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#888",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: "#FF5733",
    borderColor: "#FF5733",
  },
  checkboxText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;
