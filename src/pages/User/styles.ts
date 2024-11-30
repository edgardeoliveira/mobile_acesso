import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export default StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0", 
    alignItems: "center",
    justifyContent: "center",
    padding: 20, 
    backgroundColor: "#F9F9F9", 
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "600", 
    color: "#333", 
  },
  inputView: {
    marginBottom: 30,
    width: "100%", 
    alignItems: "center",
  },
  input: {
    height: 50,
    paddingHorizontal: 15, 
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#C0C0C0", 
    borderRadius: 10, 
    width: width - 60, 
    backgroundColor: "#FFF", 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
});
