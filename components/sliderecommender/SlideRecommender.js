import { ScrollView, StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'

const SlideRecommender = ({ list }) => { // Receive the list prop here
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {list.map((item, index) => (
        <Pressable
          key={item.id}
          style={{
            margin: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 50, height: 50, resizeMode: "contain" }}
            source={{ uri: item.images[0] }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              fontWeight: 500,
              marginTop: 5,
            }}
          >
            {item?.name}
          </Text>
        </Pressable>
      ))}
    </ScrollView> 
  )
}

export default SlideRecommender

const styles = StyleSheet.create({})
