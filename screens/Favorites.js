import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import CategoryProduct from "../components/CategoryProduct";
import { AntDesign, Feather } from "@expo/vector-icons";

const Favorites = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Correct placement of useState hook

  const favorites = useSelector((state) => state.favorites.favorites);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Assuming you have a function to handle search
  };

  const navigateToFavorites = () => {
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
      <View style={styles.container}>
        {/* Header and Search */}
        <View style={styles.header}>
          <Pressable style={styles.searchBar}>
            <AntDesign
              style={styles.searchIcon}
              name="search1"
              size={22}
              color="black"
            />
            <TextInput
              placeholder="Search for products"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              style={styles.searchInput}
            />
          </Pressable>
          <Pressable onPress={navigateToFavorites} style={styles.favoriteContainer}>
            <AntDesign
              style={styles.favoriteIcon}
              name="hearto"
              size={24}
              color="black"
            />
          </Pressable>
        </View>
        <Text style={styles.heading}>Favorites</Text>
        {favorites.length === 0 ? (
          <Text style={styles.emptyText}>No favorites added yet.</Text>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CategoryProduct item={item} isFavorite={true} />}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
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
  searchIcon: {
    paddingLeft: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "black",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#888",
  },
  list: {
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8, // Adjust input padding
    fontSize: 16, // Adjust input font size
  },
  favoriteContainer: {
    padding: 5, // Adjust padding around the heart icon
  },
  favoriteIcon: {
    paddingRight: 1,
  },
  locationBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 10,
    backgroundColor: "#FAC369",
  },
});

export default Favorites;
