import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 140,
    marginTop: 40,
  },
  header: {
    alignItems: 'center',
    marginVertical: 12,
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#041E42',
  },
  inputContainer: {
    marginTop: 35,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#D0D0D0',
    padding: 7,
    borderRadius: 5,
    marginVertical: 10,
  },
  icon: {
    marginLeft: 8,
  },
  input: {
    color: 'gray',
    width: 300,
    fontSize: 16,
  },
  footer: {
    marginTop: 80,
    alignItems: 'center',
  },
  registerButton: {
    width: 200,
    backgroundColor: '#FEBE10',
    padding: 15,
    borderRadius: 6,
  },
  registerButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInLink: {
    marginTop: 12,
  },
  signInText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
  },
});
