import React from "react";
import { View, FlatList, StyleSheet, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import CategoryProduct from "../components/CategoryProduct";
import { AntDesign, Feather } from "@expo/vector-icons";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favorites);

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
          <AntDesign style={styles.searchIcon} name="search1" size={22} color="black" />
          <TextInput placeholder="Search for products" style={styles.searchInput} />
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>
      <Text style={styles.heading}>Favorites</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites added yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CategoryProduct item={item} />}
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
  searchInput: {
    flex: 1,
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
});

export default Favorites;
