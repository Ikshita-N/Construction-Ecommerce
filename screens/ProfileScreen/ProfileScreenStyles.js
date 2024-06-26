import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 55,
  },
  headerStyle: {
    backgroundColor: '#00CED1',
  },
  headerImage: {
    width: 140,
    height: 120,
    resizeMode: 'contain',
  },
  headerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  button: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 25,
    margin: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  ordersContainer: {
    marginTop: 20,
    paddingLeft: 10,
  },
  orderItem: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImageContainer: {
    marginVertical: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
