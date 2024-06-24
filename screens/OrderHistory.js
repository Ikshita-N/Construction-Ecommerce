import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const orders = await AsyncStorage.getItem('orders');
      const parsedOrders = orders ? JSON.parse(orders) : [];
      setOrders(parsedOrders);
    } catch (error) {
      console.log('Error fetching orders', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.orderTitle}>Order History</Text>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <View key={index} style={styles.orderContainer}>
            <Text style={styles.orderText}>Order #{index + 1}</Text>
            <Text style={styles.orderText}>Total: ${order.totalPrice}</Text>
            <Text style={styles.orderText}>Address: {order.shippingAddress.street}</Text>
            <Text style={styles.orderText}>Payment Method: {order.paymentMethod}</Text>
            <Text style={[styles.orderText, styles.itemsTitle]}>Items:</Text>
            {order.cartItems.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.cartItem}>
                <Text style={styles.cartItemText}>{item.title}</Text>
                <Text style={styles.cartItemText}>Quantity: {item.quantity}</Text>
                <Text style={styles.cartItemText}>Price: ${item.price}</Text>
              </View>
            ))}
          </View>
        ))
      ) : (
        <Text style={styles.noOrdersText}>No orders found</Text>
      )}
    </ScrollView>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  orderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333', // Dark grey text
    textAlign: 'center',
  },
  orderContainer: {
    backgroundColor: '#F0F0F0', // Light grey background
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
    elevation: 3,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333', // Dark grey text
  },
  itemsTitle: {
    marginTop: 12,
    fontWeight: 'bold',
    color: '#FFAD33', // Orange text
  },
  cartItem: {
    marginLeft: 20,
    marginTop: 8,
  },
  cartItemText: {
    fontSize: 14,
    color: '#666666', // Grey text
  },
  noOrdersText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    color: '#333333', // Dark grey text
  },
});
