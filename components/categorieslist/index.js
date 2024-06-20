import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Categories from '../../Categories/index'
import Products from '../../data'
import ProductComponent from '../ProductComponent'
import { useNavigation } from '@react-navigation/native'
const CategoriesList = () => {   
  const navigation = useNavigation();

  return (
    <View>
      <ScrollView>
            {Categories.map((category, index) => (
              <View key={index}>
                <Text
                  style={{
                    padding: 7,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {category.name}
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {Products.filter(
                    (product) => product.category === Categories[index].name
                  ).map((product) => (
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
          
    </View>
  )
}

export default CategoriesList

const styles = StyleSheet.create({})