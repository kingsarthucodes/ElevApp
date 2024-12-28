import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginBottom: 12,
    height: 50,
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: "#007bff", // Blue color
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    margin: 16, // Padding around the button to keep it clean
    alignSelf: "center", // Center horizontally
    width: "90%", // Full width with padding on the sides
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
