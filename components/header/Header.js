// Header.js

import React, { useState } from "react";
import { View, Pressable, TextInput, StyleSheet } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Products } from "../../data"; 

const Header = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    const searchTerm = searchQuery.trim().toLowerCase();

    // Find the product that matches the search term in title or category
    const foundProduct = Products.find(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );

    if (foundProduct) {
      // Navigate to ProductInfoScreen with the found product
      navigation.navigate("Info", { ...foundProduct });
    } else {
      // Handle case where no product is found
      console.log("No product found for search term:", searchTerm);
      // Optionally, display a message or handle the error
    }
  };

  return (
    <View style={styles.header}>
      <Pressable style={styles.searchBar}>
        <AntDesign name="search1" size={22} color="black" />
        <TextInput
          placeholder="Search for products"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          style={styles.searchInput}
        />
      </Pressable>
      <Feather name="mic" size={24} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFAD33",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: "white",
    borderRadius: 3,
    height: 38,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
});

export default Header;
