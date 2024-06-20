import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { AirbnbRating } from 'react-native-ratings'; // Ensure correct import
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message'; // Ensure correct import

const CategoryProduct = ({ id, title, image, price, rating, mrp, reviews }) => {
  const discount = Math.round(((mrp - price) / mrp) * 100);
  const [isInBasket, setIsInBasket] = useState(false);
  const [isInFavourites, setIsInFavourites] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
 

  const goToBasket = () => {
    navigation.navigate('Checkout');
  };

  const addToFavourites = () => {
    setIsInFavourites(!isInFavourites);
    Toast.show({
      type: 'success',
      text1: isInFavourites ? 'Removed from Favourites' : 'Added to Favourites',
      text2: `The item has been ${isInFavourites ? 'removed from' : 'added to'} your favourites.`
    });
  };

  return (
    isLoading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : (
      <View style={styles.categoryProduct}>
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { id })}>
          <Image style={styles.productImage} source={{ uri: image }} />
        </TouchableOpacity>
        <View style={styles.productInfo}>
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { id })}>
            <Text style={styles.productTitle}>{title}</Text>
          </TouchableOpacity>
          <Text style={styles.productPrice}>
            ₹{price} <Text style={styles.mrp}>M.R.P: ₹{mrp}</Text>
            {discount > 0 && <Text style={styles.discount}> ({discount}% off)</Text>}
          </Text>
          <View style={styles.rating}>
            <AirbnbRating 
              count={5}
              reviews={[]}
              defaultRating={rating}
              size={20}
              isDisabled={true}
            />
            <Text style={styles.ratingText}>{rating} Rated by {reviews.length}</Text>
          </View>

        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  categoryProduct: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    marginTop: 5,
    fontSize: 14,
  },
  mrp: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  discount: {
    color: 'red',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 10,
    fontSize: 12,
    color: '#888',
  },
  buttons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CategoryProduct;
