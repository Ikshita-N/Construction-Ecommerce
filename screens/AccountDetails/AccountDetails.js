// AccountDetails.js
import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import initialState from '../../reducer';
import styles from './AccountDetailsStyles'; 

const AccountDetails = () => {
  const user = initialState.user;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
        <Text style={styles.displayName}>{user.displayName}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.phone}>Phone: {user.phone}</Text>
        <Text style={styles.gender}>Gender: {user.gender}</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Addresses</Text>
        {user.addresses.map((address) => (
          <View key={address.id} style={styles.addressItem}>
            <Text style={styles.addressName}>{address.name}</Text>
            <Text>{address.street}</Text>
            <Text>
              {address.city}, {address.state} {address.zip}
            </Text>
            <Text>{address.country}</Text>
            {address.isDefault && (
              <Text style={styles.defaultAddress}>Default Address</Text>
            )}
          </View>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        {user.paymentMethods.map((method) => (
          <View key={method.id} style={styles.paymentMethodItem}>
            <Text style={styles.paymentMethodType}>{method.type}</Text>
            <Text>Last 4 digits: {method.last4}</Text>
            <Text>Expiration: {method.expiration}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default AccountDetails;
