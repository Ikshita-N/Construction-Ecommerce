import React, { useEffect } from 'react';
import { Text, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './OrderScreenStyles'; // Import styles from separate file

const OrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main');
    }, 1300);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={require('../../assets/thumbs.json')}
        style={styles.animationContainer}
        autoPlay
        loop={false}
        speed={0.7}
      />
      <Text style={styles.animationText}>Your Order Has been Received</Text>
      <LottieView
        source={require('../../assets/sparkle.json')}
        style={styles.sparkleAnimation}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </SafeAreaView>
  );
};

export default OrderScreen;
