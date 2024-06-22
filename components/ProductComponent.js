import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import StarRating from "react-native-star-rating-widget";

const ProductComponent = ({ navigation, product }) => {
  const {
    id, title, price, images, mrp, rating, category, description, keyFeatures, specifications, reviews,
  } = product;

  const discount = Math.round((mrp - price) * 100 / mrp);
  const truncatedTitle = title.length > 14 ? `${title.substring(0, 14)}...` : title;

  const navigateToProductInfo = () => {
    navigation.navigate("Info", {
      id,
      title,
      price,
      images,
      mrp,
      rating,
      item: product,
      category,
      description,
      keyFeatures,
      specifications,
      reviews,
      discount,
    });
  };

  return (
    <Pressable onPress={navigateToProductInfo} style={styles.pressable}>
      <Image style={styles.image} source={{ uri: images[0] }} />
      <Text style={styles.title}>{truncatedTitle}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{rating}</Text>
        <StarRating
          rating={rating}
          starSize={20}
          maxStars={1}
          animationConfig={{ scale: 1.2 }}
          emptyColor="#FFD700"
          fullColor="#FFD700"
          halfColor="#FFD700"
          disabled
        />
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>₹{price}</Text>
        <Text style={styles.mrp}>₹{mrp}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    margin: 10,
    alignItems: "flex-start",
    justifyContent: "center",
    position: "relative",
  },
 image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 5,
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
    textAlign: "left",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    marginRight: 5,
    textAlign: "left",
  },
  mrp: {
    fontSize: 14,
    color: "gray",
    textDecorationLine: "line-through",
    textAlign: "left",
  },
});

export default ProductComponent;
