import React, { useRef, useState, useEffect } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const images = [
  require('./images/image1.jpeg'),
  require('./images/image2.jpeg'),
  require('./images/image3.jpeg'),
  require('./images/image4.jpeg'),
  require('./images/image5.jpeg'),
];

const CarouselHome = () => {
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(index);
  };

  const handleDotPress = (index) => {
    scrollViewRef.current.scrollTo({ x: screenWidth * index, animated: true });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      scrollViewRef.current.scrollTo({ x: screenWidth * nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={[styles.container]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => handleDotPress(index)}>
            <View style={styles.imageContainer}>
              <Image source={image} style={styles.image} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: screenWidth,
    resizeMode: 'contain',
  },
});

export default CarouselHome;
