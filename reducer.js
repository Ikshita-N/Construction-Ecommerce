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
      displayName: "Ikshita",
      email: "ikshita@example.com",
      password: "Ikshita",
      photoURL:
        "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
      gender: "Female",
      addresses: [
        {
          id: "1",
          name: "Ikshita",
          street: "123 Main Street",
          city: "Bengaluru",
          state: "Karnataka",
          zip: "560001",
          country: "India",
          isDefault: true,
        },
        {
          id: "2",
          name: "Ikshita",
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
