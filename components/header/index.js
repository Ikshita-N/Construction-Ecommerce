import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

const Header = () => {
  return (
    <View>
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

          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              backgroundColor: "#FAC369",
            }}
          >
            <Ionicons name="location-outline" size={24} color="black" />
            <Pressable>
              <Text style={{ fontSize: 13, fontWeight: 500 }}>
                Deliver to Ikshita - Dharwad 580007
              </Text>
            </Pressable>

            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>    
          </View>
  )
}

export default Header;

const styles = StyleSheet.create({})