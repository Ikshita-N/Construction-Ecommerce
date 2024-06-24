const initialState = {
    favouriteItems: [
      {
        id: 1,
        image: "https://m.media-amazon.com/images/I/714rkFrqqXL._SX450_.jpg",
        mrp: 2599,
        price: 2499,
        rating: 4.5,
        title: "Electric Drill Machine 13mm",
      },
    ],
    basket: [],
    user: {
      displayName: "Viswas",
      email: "viswas@example.com",
      password: "viswas",
      photoURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVI8wwjmbk07RHjMaoxGcLQw5kRfAizckn7g&s",
      gender: "Male",
      addresses: [
        {
          id: "1",
          name: "Viswas",
          street: "123 Main Street",
          city: "Bengaluru",
          state: "Karnataka",
          zip: "560001",
          country: "India",
          isDefault: true,
        },
        {
          id: "2",
          name: "Viswas",
          street: "456 Park Avenue",
          city: "Mumbai",
          state: "Maharashtra",
          zip: "400001",
          country: "India",
          isDefault: false,
        },
      ],
      phone: "+91 9876543210",
      paymentMethods: [
        {
          id: "1",
          type: "Credit Card",
          last4: "1234",
          expiration: "12/25",
        },
        {
          id: "2",
          type: "UPI",
          last4: "9876",
          expiration: "N/A",
        },
      ],
      isAdmin: false,
    },
    orders: [],
    products: [],
    userLoggedIn: false,
  };
  
  
  
  export default initialState;
