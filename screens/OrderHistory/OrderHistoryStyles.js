import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  orderTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  orderContainer: {
    backgroundColor: '#F0F0F0',
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
    elevation: 3,
    marginTop: 10,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333',
  },
  orderNumber: {
    textDecorationLine: 'underline',
  },
  itemsTitle: {
    marginTop: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  cartItem: {
    marginLeft: 20,
    marginTop: 1,
  },
  cartItemText: {
    fontSize: 15,
    color: '#666666',
  },
  noOrdersText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    color: '#333333',
  },
});
