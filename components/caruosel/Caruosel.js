import React, { useRef, useState } from 'react';
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

  return (
    <View style={styles.container}>
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
              {index === currentIndex && (
                <View style={styles.dotsContainer}>
                  {images.map((_, dotIndex) => (
                    <View
                      key={dotIndex}
                      style={[
                        styles.dot,
                        { backgroundColor: dotIndex === currentIndex ? '#FF5722' : '#CCCCCC' },
                      ]}
                    />
                  ))}
                </View>
              )}
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
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default CarouselHome;
