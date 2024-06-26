import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import Categories from '../../Categories'; 
import CategoryProduct from '../../components/CategoryProduct'; 
import Products from '../../data'; 
import Header from "../../components/header/Header"; 
import { SafeAreaView } from 'react-native-safe-area-context';
import AddressBottom from '../../components/addressBottom/index'; 
import axios from 'axios'; 
import { styles } from './CategoryPageStyles'; // Import styles from separate file

const CategoryPage = ({ route }) => {
  const { index } = route.params;
  const [sortBy, setSortBy] = useState('rating-high');
  const [products, setProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [filters, setFilters] = useState({
    discount: [],
    price: [0, 0]
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showSortByModal, setShowSortByModal] = useState(false);
  const [error, setError] = useState(null); // State to hold error information

  useEffect(() => {
    const categoryProducts = Products.filter(product => product.category === Categories[index].name);
    const maxPriceValue = Math.ceil(Math.max(...categoryProducts.map(product => product.price)) / 100) * 100;
    setMaxPrice(maxPriceValue);
    setFilters(prevFilters => ({ ...prevFilters, price: [0, maxPriceValue] }));
    setProducts(categoryProducts);
  }, [index]);

  useEffect(() => {
    applyFilters();
  }, [filters, sortBy]);

  const handleDefaultAddressSelection = async (address) => {
    try {
      // Example URL and payload for setting default address
      const url = 'https://example.com/api/setDefaultAddress';
      const payload = {
        addressId: address.id,
        // Include other required fields if necessary
      };

      const response = await axios.post(url, payload);
      console.log('Default address set successfully:', response.data);
      // Update state or perform other actions on success
    } catch (error) {
      console.error('Error setting default address:', error.message);
      setError('Failed to set default address. Please try again.'); // Update error state
    }
  };

  const handleFilterChange = (filterType, value) => {
    let newFilters = { ...filters };
    if (filterType === 'discount') {
      const updatedDiscounts = newFilters.discount.includes(value)
        ? newFilters.discount.filter(discount => discount !== value)
        : [...newFilters.discount, value];
      newFilters.discount = updatedDiscounts;
    } else if (filterType === 'price') {
      newFilters.price = value;
    }
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filtersToApply = filters) => {
    let filteredProducts = Products.filter(product => product.category === Categories[index].name);

    if (filtersToApply.discount.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        const discountPercentage = getDiscountPercentage(product.price, product.mrp);
        return filtersToApply.discount.some(option => discountPercentage >= option);
      });
    }

    filteredProducts = filteredProducts.filter(product => {
      return product.price >= filtersToApply.price[0] && product.price <= filtersToApply.price[1];
    });

    filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case 'rating-high':
          return b.rating - a.rating;
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        case 'most-reviews':
          return b.reviews.length - a.reviews.length;
        case 'least-reviews':
          return a.reviews.length - b.reviews.length;
        case 'discount-high':
          return getDiscountPercentage(b.price, b.mrp) - getDiscountPercentage(a.price, a.mrp);
        case 'discount-low':
          return getDiscountPercentage(a.price, a.mrp) - getDiscountPercentage(b.price, b.mrp);
        default:
          return 0;
      }
    });

    setProducts(filteredProducts);
  };

  const getDiscountPercentage = (price, mrp) => {
    const discount = ((mrp - price) / mrp) * 100;
    return Math.round(discount);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const toggleSortByModal = () => {
    setShowSortByModal(!showSortByModal);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 40 : 0,
          backgroundColor: "white",
        }}
      >
        <Header setModalVisible={setModalVisible} modalVisible={modalVisible}  />
        <AddressBottom setModalVisible={setModalVisible} modalVisible={modalVisible} addresses={addresses} onSelectDefaultAddress={handleDefaultAddressSelection}/>
      </SafeAreaView>

      <View style={styles.fixedHeader}>
        <TouchableOpacity onPress={toggleSortByModal} style={styles.sortByContainer}>
          <Text style={styles.sortByText}>Sort By: {sortByLabelMapping[sortBy]}</Text>
          <Ionicons name="chevron-down" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFilters} style={styles.filtersButton}>
          <Text style={styles.filterText}>Filters</Text>
          <Ionicons name="filter-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showSortByModal}
          onRequestClose={() => {
            setShowSortByModal(!showSortByModal);
          }}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalBackground} onPress={toggleSortByModal} />
            <View style={styles.modalContent}>
              <Picker
                style={styles.picker}
                selectedValue={sortBy}
                onValueChange={(itemValue) => {
                  setSortBy(itemValue);
                  toggleSortByModal();
                }}
              >
                <Picker.Item label="Highest Rating" value="rating-high" />
                <Picker.Item label="Price High to Low" value="price-high" />
                <Picker.Item label="Price Low to High" value="price-low" />
                <Picker.Item label="Most Reviews" value="most-reviews" />
                <Picker.Item label="Least Reviews" value="least-reviews" />
                <Picker.Item label="Discount High to Low" value="discount-high" />
                <Picker.Item label="Discount Low to High" value="discount-low" />
              </Picker>
            </View>
          </View>
        </Modal>

        {showFilters && (
          <View style={styles.filterOptions}>
            <Text style={styles.filterHeading}>Discount</Text>
            <View style={styles.checkboxContainer}>
              {[10, 20, 30, 40].map(option => (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleFilterChange('discount', option)}
                  style={[styles.checkbox, filters.discount.includes(option) && styles.checked]}
                >
                  <Text>{option}% or more</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.productList}>
          {products.map(product => (
            <View key={product.id} style={styles.categoryItems}>
              <CategoryProduct
                item={product}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

// Mapping for displaying sort by labels
const sortByLabelMapping = {
  'rating-high': 'Highest Rating',
  'price-high': 'Price High to Low',
  'price-low': 'Price Low to High',
  'most-reviews': 'Most Reviews',
  'least-reviews': 'Least Reviews',
  'discount-high': 'Discount High to Low',
  'discount-low': 'Discount Low to High',
};

export default CategoryPage;
