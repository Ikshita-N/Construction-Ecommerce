import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { AirbnbRating } from 'react-native-ratings'; 
import { useNavigation } from '@react-navigation/native';

const CategoryProduct = ({ item }) => {
  const { id, title, images, price, rating, mrp, reviews, category, description, keyFeatures, specifications } = item;
  const image = images[0];
  const discount = Math.round(((mrp - price) / mrp) * 100);
  const [isInFavourites, setIsInFavourites] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const navigateToProductInfo = () => {
    navigation.navigate("Info", {
      id,
      title,
      price,
      images,
      mrp,
      rating,
      category,
      description,
      keyFeatures,
      specifications,
      reviews,
      discount,
    });
  };
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.categoryProduct}>
      <TouchableOpacity onPress={navigateToProductInfo}>
        <Image style={styles.productImage} source={{ uri: image }} />
      </TouchableOpacity>
      <View style={styles.productInfo}>
        <TouchableOpacity onPress={navigateToProductInfo}>
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
            isDisabled
          />
          <Text style={styles.ratingText}>{rating} Rated by {reviews.length}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryProduct: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  productInfo: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#333',
  },
  mrp: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  discount: {
    color: '#d9534f',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    color: '#888',
  },
});

export default CategoryProduct;
