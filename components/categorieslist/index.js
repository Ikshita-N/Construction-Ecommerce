import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Categories from "../../Categories/index"; 
import Products from "../../data"; 
import ProductComponent from "../ProductComponent";
import { useNavigation } from "@react-navigation/native";

const CategoriesList = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      {Categories.map((category) => (
        <View key={category.name} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category.name}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Products.filter((product) => product.category === category.name).map((product) => (
              <ProductComponent
                key={product.id}
                navigation={navigation}
                product={product}
              />
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    padding: 7,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CategoriesList;
