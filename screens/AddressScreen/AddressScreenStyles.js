// AddressScreenStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: "#FFAD33",
  },
  container: {
    padding: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
  },
  input: {
    padding: 10,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginTop: 5,
  },
  addButton: {
    backgroundColor: "#FFAD33",
    padding: 19,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "bold",
  },
});
