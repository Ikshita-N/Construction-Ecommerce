import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import StarRating from "react-native-star-rating-widget"; 

const ProductComponent = ({ navigation, product }) => {
  const discount = Math.round((product.mrp - product.price) * 100 / product.mrp);
  const truncatedTitle = product.title.length > 14 ? product.title.substring(0, 14) + '...' : product.title;

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Info", {
          id: product.id,
          title: product.title,
          price: product.price,
          images: product.images,
          mrp: product.mrp,
          item: product,
          category: product.category,
          description: product.description,
          keyFeatures:product.keyFeatures,
          specifications:product.specifications,
          reviews: product.reviews,
        })
      }
      style={styles.pressable}
    >
      <Image
        style={styles.image}
        source={{ uri: product.images[0] }}
      />

      <Text style={styles.title}>{truncatedTitle}</Text>
      
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{product.rating}</Text>
        <StarRating
          rating={product.rating}
          starSize={20}
          maxStars={1} // Display only one star
          animationConfig={{ scale: 1.2 }}
          emptyColor="#FFD700"
          fullColor="#FFD700"
          halfColor="#FFD700"
          disabled={true}
        />
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>₹{product.price}</Text>
        <Text style={styles.mrp}>₹{product.mrp}</Text>
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
