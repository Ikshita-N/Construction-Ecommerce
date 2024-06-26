import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    marginTop: 40,
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    marginBottom: 5,
  },
  gender: {
    fontSize: 16,
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addressItem: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  addressName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  defaultAddress: {
    color: 'green',
    marginTop: 5,
  },
  paymentMethodItem: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  paymentMethodType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
