import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
} from "react-native";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { FontAwesome } from "@expo/vector-icons";

const ProductInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const height = (width * 100) / 100;
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  const cart = useSelector((state) => state.cart.cart);
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
    // Perform actions before navigating if needed
    navigation.navigate("Confirm", { product });
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000); // Optional: Reset addedToCart state after 2 seconds
    navigation.navigate("Cart"); // Navigate to CartScreen
  };
  const navigateToFavourites = () => {
    navigation.navigate("Fav");
  };

  return (
    <ScrollView
      style={{
        marginTop: 55,
        flex: 1,
        backgroundColor: "white",
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header and Search */}
      <View
        style={{
          backgroundColor: "#FFAD33",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={22}
            color="black"
          />
          <TextInput placeholder="Search for products" />
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>

      {/* Product Images */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {product.images.map((image, id) => (
          <ImageBackground
            style={{
              width,
              height: height,
              marginTop: 25,
              resizeMode: "contain",
            }}
            source={{ uri: image }}
            key={id}
          >
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#C60C30",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  {product.discount}% off
                </Text>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
                />
              </View>
            </View>

            <View>
              <Pressable
                onPress={navigateToFavourites}
                style={{
                  position: "absolute",
                  bottom: -300,
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: "auto",
                  marginLeft: 20,
                  marginBottom: 20,
                }}
              >
                <AntDesign name="hearto" size={24} color="black" />
              </Pressable>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      {/* Product Details */}
      <View style={{ padding: 10 }}>
        {/* Product Title with Stars */}
        <View >
          <Text
            style={{
              fontWeight: "500",
              fontSize: 18,
              marginRight: 5,
            }}
          >
            {product.title}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
        {renderStars(product.rating)}
            <Text>({product.rating})</Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginTop: 6,
          }}
        >
          ₹{product.price}
        </Text>

        <Text
          style={{
            fontSize: 15,
            fontWeight: "300",
            marginTop: 6,
          }}
        >
          <Text>MRP: </Text>₹{product.mrp}
        </Text>
      </View>

      <Text
        style={{
          height: 1,
          borderColor: "#D0D0D0",
          borderWidth: 1,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 15,
          }}
        >
          {product.description}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          Category:
        </Text>
        <Text> {product.category}</Text>
      </View>

      <View
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          Key Features:
        </Text>
        {product.keyFeatures.map((feature, index) => (
          <Text key={index}>- {feature}</Text>
        ))}
      </View>

      <View
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          Specifications:
        </Text>
        {Object.keys(product.specifications).map((key, index) => (
          <Text key={index}>
            - <Text style={{ fontWeight: "bold" }}>{key}</Text>:{" "}
            {product.specifications[key]}
          </Text>
        ))}
      </View>

      <Text
        style={{
          height: 1,
          borderColor: "#D0D0D0",
          borderWidth: 1,
        }}
      />

      <View
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            marginVertical: 15,
          }}
        >
          Total: ₹{product.price}
          <Text
            style={{
              fontSize: 12,
            }}
          >
            {" "}
            (Including all taxes)
          </Text>
        </Text>
        <Text
          style={{
            color: "#00CED1",
          }}
        >
          {" "}
          FREE delivery tomorrow by 3 PM. Order within 10hrs 30min
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginVertical: 5,
          alignItems: "center",
          gap: 5,
        }}
      >
        <Ionicons name="location" size={24} color="black" />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          {" "}
          Deliver to Ikshita - Dharwad 580007
        </Text>
      </View>

      <Text
        style={{
          color: "green",
          marginHorizontal: 10,
          fontWeight: "500",
        }}
      >
        IN Stock
      </Text>

      <Pressable
  onPress={() => {
    addItemToCart(product);
    handleAddToCart();
  }}
  style={{
    backgroundColor: "#FFC72C",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  }}
>
  {addedToCart ? (
    <View>
      <Text>Added to Cart</Text>
    </View>
  ) : (
    <Text>Add to Cart</Text>
  )}
</Pressable>

      <Pressable
        style={{
          backgroundColor: "#FFAC1C",
          padding: 10,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
        onPress={handleBuyNow}
      >
        <Text>Buy Now</Text>
      </Pressable>

      <View
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          Reviews:
        </Text>
        {product.reviews.map((review, index) => (
          <View key={index} style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>
              - Reviewer: {review.reviewer}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Rating: </Text>
              {renderStars(review.rating)}
            </View>
            <Text>Comment: {review.comment}</Text>
            <Text>Date: {review.date}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
