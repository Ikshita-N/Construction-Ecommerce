import React, { useState } from "react";
import {
  ScrollView,
  Pressable,
  Text,
  ImageBackground,
  View,
  Dimensions,
} from "react-native";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartReducer";
import { addToFavorites, removeFromFavorites } from "../../redux/FavReducer";
import Header2 from "../../components/header/Header2";
import styles from "./ProductInfoScreenStyles";

const ProductInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  const cart = useSelector((state) => state.cart.cart);
  const itemInCart = (item) => {
    return cart.some((cartItem) => cartItem.id === item.id);
  };

  const favorites = useSelector((state) => state.favorites.favorites);
  const itemInFav = (item) => {
    return favorites.some((favoritesItem) => favoritesItem.id === item.id);
  };

  const product = route.params;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= fullStars; i++) {
      stars.push(
        <FontAwesome
          key={`star-${i}`}
          name="star"
          size={20}
          color="#FFD700"
          style={{ marginRight: 2 }}
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FontAwesome
          key={`star-half-${Math.random()}`}
          name="star-half-empty"
          size={20}
          color="#FFD700"
          style={{ marginRight: 2 }}
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);

    for (let i = 1; i <= emptyStars; i++) {
      stars.push(
        <FontAwesome
          key={`empty-${i}`}
          name="star-o"
          size={20}
          color="#CCCCCC"
          style={{ marginRight: 2 }}
        />
      );
    }

    return stars;
  };

  const handleBuyNow = () => {
    navigation.navigate("Confirm", { product });
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const favButton = () => {
    itemInFav(product)
      ? dispatch(removeFromFavorites(product))
      : dispatch(addToFavorites(product));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header2 />
      {/* Product Images */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {product.images.map((image, id) => (
          <ImageBackground
            style={styles.imageBackground}
            source={{ uri: image }}
            key={id}
          >
            <View style={{ padding: 20 }}>
              <View style={styles.discountBadge}>
                <Text style={{ color: "white", textAlign: "center", fontWeight: "600", fontSize: 12 }}>
                  {product.discount}% off
                </Text>
              </View>
            </View>

            <View>
              <Pressable
                onPress={favButton}
                style={styles.favButtonContainer}
              >
                {itemInFav(product) ? (
                  <AntDesign name="heart" style={styles.favIcon} />
                ) : (
                  <AntDesign name="hearto" style={styles.favIcon} />
                )}
              </Pressable>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      {/* Product Details */}
      <View style={{ padding: 10 }}>
        {/* Product Title with Stars */}
        <View>
          <Text style={styles.productTitle}>{product.title}</Text>
        </View>
        <View style={styles.starContainer}>
          {renderStars(product.rating)}
          <Text>({product.rating})</Text>
        </View>
        <Text style={styles.priceText}>₹{product.price}</Text>

        <Text style={styles.mrpText}>
          MRP: ₹{product.mrp}
        </Text>
      </View>

      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text style={styles.descriptionText}>{product.description}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Category:</Text>
        <Text> {product.category}</Text>
      </View>

      <View style={styles.keyFeaturesContainer}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Key Features:</Text>
        {product.keyFeatures.map((feature, index) => (
          <Text key={index} style={styles.keyFeatureText}>
            - {feature}
          </Text>
        ))}
      </View>

      <View style={styles.specificationsContainer}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Specifications:</Text>
        {Object.keys(product.specifications).map((key, index) => (
          <Text key={index} style={styles.specificationText}>
            - <Text style={{ fontWeight: "bold" }}>{key}</Text>:{" "}
            {product.specifications[key]}
          </Text>
        ))}
      </View>

      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total: ₹{product.price}{" "}
          <Text style={{ fontSize: 12 }}> (Including all taxes)</Text>
        </Text>
        <Text style={styles.deliveryText}>
          FREE delivery tomorrow by 3 PM. Order within 10hrs 30min
        </Text>
      </View>

      <View style={styles.deliverToContainer}>
        <Ionicons name="location" style={styles.locationIcon} />
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {" "}
          Deliver to Ikshita - Dharwad 580007
        </Text>
      </View>

      <Text style={styles.inStockText}>IN Stock</Text>

      <Pressable
        style={styles.buttonContainer}
        onPress={() => {
          addItemToCart(product);
          handleAddToCart();
        }}
      >
        {itemInCart(product) ? (
          <View>
            <Text style={styles.buttonText}>Added to Cart</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>Add to Cart</Text>
        )}
      </Pressable>

      <Pressable
        style={styles.buyNowButtonContainer}
        onPress={handleBuyNow}
      >
        <Text style={styles.buttonText}>Buy Now</Text>
      </Pressable>

      <View style={styles.reviewsContainer}>
        <Text style={styles.reviewText}>Reviews:</Text>
        {product.reviews.map((review, index) => (
          <View key={index} style={{ marginVertical: 5 }}>
            <Text style={styles.reviewerText}>
              - Reviewer: {review.reviewer}
            </Text>
            <View style={styles.reviewRatingContainer}>
              <Text>Rating: </Text>
              {renderStars(review.rating)}
            </View>
            <Text style={styles.reviewCommentText}>
              Comment: {review.comment}
            </Text>
            <Text style={styles.reviewDateText}>Date: {review.date}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ProductInfoScreen;
