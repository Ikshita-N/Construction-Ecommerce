import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import CategoryProduct from '../components/CategoryProduct'; 
import Products from '../data'; 
import Header from "../components/header/Header"; 
import { SafeAreaView } from 'react-native-safe-area-context';
import AddressBottom from '../components/addressBottom/index'; 
import axios from 'axios'; 

const SearchPage = ({ route }) => {
  const initialQuery = route.params?.searchQuery || ''; 
  const [query, setQuery] = useState(initialQuery);  
  const [sortBy, setSortBy] = useState('rating-high');
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [filters, setFilters] = useState({
    discount: [],
    price: [0, 0]
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showSortByModal, setShowSortByModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setAllProducts(Products);
    const maxPriceValue = Math.ceil(Math.max(...Products.map(product => product.price)) / 100) * 100;
    setMaxPrice(maxPriceValue);
    setFilters(prevFilters => ({ ...prevFilters, price: [0, maxPriceValue] }));
  }, []);

  useEffect(() => {
    applyFilters(filters);
  }, [query, allProducts, filters, sortBy]);

  const handleDefaultAddressSelection = async (address) => {
    try {
      const url = 'https://example.com/api/setDefaultAddress';
      const payload = {
        addressId: address.id,
      };

      const response = await axios.post(url, payload);
      console.log('Default address set successfully:', response.data);
    } catch (error) {
      console.error('Error setting default address:', error.message);
      setError('Failed to set default address. Please try again.');
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      let newFilters = { ...prevFilters };
      if (filterType === 'discount') {
        newFilters.discount = prevFilters.discount.includes(value)
          ? prevFilters.discount.filter(discount => discount !== value)
          : [...prevFilters.discount, value];
      } else if (filterType === 'price') {
        newFilters.price = value;
      }
      return newFilters;
    });
  };

  const applyFilters = (filtersToApply) => {
    console.log('Applying filters:', filtersToApply);
    let newFilteredProducts = [...allProducts];

    // Apply search query filter
    if (query) {
      newFilteredProducts = newFilteredProducts.filter((product) => {
        const lowerCaseTitle = product.title?.toLowerCase();
        const lowerCaseCategory = product.category?.toLowerCase();
        const lowerCaseTags = product.tags?.map(tag => tag.toLowerCase());

        return lowerCaseTitle?.includes(query.toLowerCase()) ||
               lowerCaseCategory?.includes(query.toLowerCase()) ||
               (lowerCaseTags && lowerCaseTags.some(tag => tag.includes(query.toLowerCase())));
      });
    }

    // Apply discount filter
    if (filtersToApply.discount.length > 0) {
      newFilteredProducts = newFilteredProducts.filter(product => {
        const discountPercentage = getDiscountPercentage(product.price, product.mrp);
        return filtersToApply.discount.some(option => discountPercentage >= option);
      });
    }

    // Apply price filter
    newFilteredProducts = newFilteredProducts.filter(product => {
      return product.price >= filtersToApply.price[0] && product.price <= filtersToApply.price[1];
    });

    // Apply sorting
    newFilteredProducts.sort((a, b) => {
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

    console.log('Filtered products:', newFilteredProducts.length);
    setFilteredProducts(newFilteredProducts);
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
            <Text style={styles.filterHeading}>Price Range</Text>
            <View style={styles.priceRangeContainer}>
              <Text>₹{filters.price[0]}</Text>
              <Text>to</Text>
              <Text>₹{filters.price[1]}</Text>
            </View>
            {/* Add a slider or input fields for price range selection here */}
          </View>
        )}

        <View style={styles.productList}>
          {filteredProducts.map(product => (
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

const sortByLabelMapping = {
  'rating-high': 'Highest Rating',
  'price-high': 'Price High to Low',
  'price-low': 'Price Low to High',
  'most-reviews': 'Most Reviews',
  'least-reviews': 'Least Reviews',
  'discount-high': 'Discount High to Low',
  'discount-low': 'Discount Low to High',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fixedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  sortByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortByText: {
    marginRight: 5,
    fontSize: 16,
  },
  filtersButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    marginRight: 5,
    fontSize: 16,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  picker: {
    width: '100%',
  },
  filterOptions: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  filterHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkbox: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  checked: {
    backgroundColor: '#007bff',
  },
  priceRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  productList: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  categoryItems: {
    marginBottom: 20,
  },
  errorContainer: {
    backgroundColor: '#f8d7da',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  errorText: {
    color: '#721c24',
    fontSize: 14,
  },
});

export default SearchPage;