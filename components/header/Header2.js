import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

const Header2 = () => {
  const navigation = useNavigation();
  const navigateToFavorites = () => {
        navigation.navigate("Fav"); 
      };
  return (
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
        <Pressable onPress={navigateToFavorites} style={styles.favoriteContainer}>
          <AntDesign
            style={styles.favoriteIcon}
            name="hearto"
            size={24}
            color="black"
          />
        </Pressable>      
        </View>
  )
}

export default Header2

const styles = StyleSheet.create({})