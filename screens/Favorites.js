import React from "react";
import { View, FlatList, StyleSheet, Text, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import CategoryProduct from "../components/CategoryProduct";
import Header2 from "../components/header/Header2";

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
      <Header2 />

      <Text style={styles.heading}>Favorites</Text>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            style={styles.emptyImage}
            source={require("./images/empty.png")}
          />
          <Text style={styles.emptyText}>Your favorite list is looking a bit lonely.</Text>
          <Text style={styles.emptySubtext}>Add some items to fill it up!</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CategoryProduct item={item} isFavorite={true} />}
          contentContainerStyle={styles.list}
        />
      )}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "black",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyImage: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#888",
  },
  emptySubtext: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
});

export default Favorites;
