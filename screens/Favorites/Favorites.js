import React from 'react';
import { View, FlatList, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import CategoryProduct from '../../components/CategoryProduct';
import Header2 from '../../components/header/Header2';
import styles from './FavoritesStyles';

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <ScrollView
      style={{
        marginTop: 55,
        flex: 1,
        backgroundColor: 'white',
      }}
      showsVerticalScrollIndicator={false}
    >
      <Header2 />

      <Text style={styles.heading}>Favorites</Text>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image style={styles.emptyImage} source={require('./empty.png')} />
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

export default Favorites;
