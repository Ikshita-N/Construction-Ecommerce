import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { removeFromFavorites } from "../redux/FavReducer";
import { AntDesign } from "@expo/vector-icons";

const CategoryProduct = ({ item, isFavorite = false }) => {
  const {
    id,
    title,
    images,
    price,
    rating,
    mrp,
    reviews,
    category,
    description,
    keyFeatures,
    specifications,
  } = item;
  const image = images[0];
  const discount = Math.round(((mrp - price) / mrp) * 100);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute(); // Using useRoute hook to access route object

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

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    navigation.navigate("Cart"); // Navigate to Cart after adding to cart
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(item));
  };

  const addItemToCart = () => {
    dispatch(addToCart(item));
  };

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
          {discount > 0 && (
            <Text style={styles.discount}> ({discount}% off)</Text>
          )}
        </Text>
        <View style={styles.rating}>
          <AirbnbRating
            count={5}
            reviews={[]}
            defaultRating={rating}
            size={20}
            isDisabled
          />
          <Text style={styles.ratingText}>
            {rating} Rated by {reviews.length}
          </Text>
        </View>
        {isFavorite && (
          <View style={styles.buttonsContainer}>
            <Button
              title="Add to Cart"
              onPress={() => {
                addItemToCart();
                handleAddToCart();
              }}
            />
            <TouchableOpacity
              onPress={handleRemoveFromFavorites}
              style={styles.deleteIcon}
            >
              <AntDesign name="delete" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryProduct: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  productInfo: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "center",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "#333",
  },
  mrp: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  discount: {
    color: "#d9534f",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
    color: "#888",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  deleteIcon: {
    marginLeft: 10,
  },
});

export default CategoryProduct;
