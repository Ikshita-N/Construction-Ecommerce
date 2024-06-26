import React, { useContext, useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { UserType } from '../../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getIpAddress } from '../../IpAddressUtils';
import styles from './AddAddressScreenStyles'; 

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(null); 
  const ipAddress = getIpAddress(); 
  const { userId, setUserId } = useContext(UserType);

 
  const fetchAddresses = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');

      const response = await axios.get(`http://${ipAddress}:8000/addresses/${token}`);
      const { addresses, defaultAddress } = response.data;
      setAddresses(addresses);
      setDefaultAddress(defaultAddress);
    } catch (error) {
      console.log('error', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAddresses();
    }, [])
  );

 
  const handleSetDefaultAddress = async (addressId) => {
    try {
      const token = await AsyncStorage.getItem('authToken');

      await axios.post(`http://${ipAddress}:8000/addresses/set-default`, {
        token,
        addressId,
      });

      setDefaultAddress({ _id: addressId }); 
    } catch (error) {
      console.log('error setting default address', error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
      <View style={styles.header}>
        <Pressable style={styles.searchBar}>
          <AntDesign style={styles.searchIcon} name="search1" size={22} color="black" />
          <TextInput placeholder="Search products" />
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.title}>Your Addresses</Text>
        <Pressable onPress={() => navigation.navigate('Add')} style={styles.addNewAddress}>
          <Text>Add a new Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        {addresses?.map((item, index) => (
          <Pressable key={index} style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <Text style={styles.addressName}>{item?.name}</Text>
              <Entypo name="location-pin" size={24} color="red" />
            </View>
            <Text style={styles.addressText}>{item?.houseNo}, {item?.landmark}</Text>
            <Text style={styles.addressText}>{item?.street}</Text>
            <Text style={styles.addressText}>India</Text>
            <Text style={styles.addressText}>Phone No. {item?.mobileNo}</Text>
            <Text style={styles.addressText}>Pin code: {item.postalCode}</Text>

            <View style={styles.addressActions}>
              <Pressable style={styles.addressActionButton}>
                <Text>Edit</Text>
              </Pressable>

              <Pressable style={styles.addressActionButton}>
                <Text>Remove</Text>
              </Pressable>

              <Pressable
                onPress={() => handleSetDefaultAddress(item._id)}
                style={[
                  styles.addressActionButton,
                  defaultAddress && defaultAddress._id === item._id && styles.defaultButton,
                ]}
              >
                <Text>{defaultAddress && defaultAddress._id === item._id ? 'Default' : 'Set as Default'}</Text>
              </Pressable>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;
