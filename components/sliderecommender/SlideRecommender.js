import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SlideRecommender = ({ Categories }) => {
  const navigation = useNavigation();

  const handleCategoryPress = (index) => {
    navigation.navigate('Category', { index });
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {Categories.map((category, index) => (
        <Pressable
          key={index}
          onPress={() => handleCategoryPress(index)}
          style={styles.container}
        >
          <Image source={{ uri: category.image }} style={styles.image} />
          <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
            {category.name}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  text: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: 120,
  },
});

export default SlideRecommender;
