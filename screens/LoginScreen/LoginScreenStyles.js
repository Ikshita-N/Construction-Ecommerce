// LoginScreenStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 140,
    marginTop: 40,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#041E42',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D0D0D0',
    padding: 7,
    borderRadius: 5,
    marginTop: 30,
  },
  inputIcon: {
    marginLeft: 8,
  },
  input: {
    color: 'gray',
    marginVertical: 10,
    width: 300,
    fontSize: 16,
  },
  loginButton: {
    width: 200,
    backgroundColor: '#FEBE10',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
    borderRadius: 6,
    marginTop: 80,
  },
  loginButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
  },
});
