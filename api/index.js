const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { getIpAddress } = require('../IpAddressUtils');

const app = express();
const port = 8000;
const ipAddress = getIpAddress;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose
  .connect("mongodb+srv://Ikshita:Ikshita@cluster0.07w0cgh.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });

const User = require("./models/user");
const Order = require("./models/order");

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ikshita.nukavarapu@gmail.com",
      pass: "mpkg ntmc xxfe wgqq",
    },
  });

  const mailOptions = {
    from: "ikshita.nukavarapu@gmail.com",
    to: email,
    subject: "Email Verification..Test email",
    text: `Please click the following link to verify your email: http://${ipAddress}:8000/verify/${verificationToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

const generateSecretKey = () => {
  return "secretKey";
};

const secretKey = generateSecretKey();

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({ name, email, password });
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    await newUser.save();

    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(201).json({
      message: "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
});

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email Verification Failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
});

app.post("/addresses", async (req, res) => {
  try {
    const { token, address } = req.body;
    const userId = jwt.verify(token, secretKey).userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.addresses.push(address);
    await user.save();

    res.status(200).json({ message: "Address added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding address" });
  }
});

app.get("/addresses/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const userId = jwt.verify(token, secretKey).userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the default address
    const defaultAddress = user.addresses.find(address => address._id.toString() === user.defaultAddress?.toString());

    res.status(200).json({ addresses: user.addresses, defaultAddress });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving addresses" });
  }
});


app.post("/addresses/set-default", async (req, res) => {
  try {
    const { token, addressId } = req.body;
    const userId = jwt.verify(token, secretKey).userId;

    const user = await User.findById(new mongoose.Types.ObjectId(userId));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.defaultAddress = addressId;
    await user.save();

    res.status(200).json({ message: "Default address set successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error setting default address" });
  }
});

//endpoint to store all the orders
app.post("/orders", async (req, res) => {
  try {
    // const { token, cartItems, totalPrice, shippingAddress, paymentMethod } =
    //   req.body;
    const {token, ...order} = req.body
    const userId = jwt.verify(token, secretKey).userId;

    const user = await User.findById(new mongoose.Types.ObjectId(userId));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    order.user = user
    //create an array of product objects from the cart Items
    // const products = cartItems.map((item) => ({
    //   name: item?.title,
    //   quantity: item.quantity,
    //   price: item.price,
    //   image: item?.image,
    // }));

    //create a new Order
    // const order = new Order({
    //   user: token,
    //   products: products,
    //   totalPrice: totalPrice,
    //   shippingAddress: shippingAddress,
    //   paymentMethod: paymentMethod,
    // });
    const order1 = Order.create(order)
    // await order1.save();

    res.status(200).json({ message: "Order created successfully!" });
  } catch (error) {
    console.log("error creating orders", error);
    res.status(500).json({ message: "Error creating orders" });
  }
});

//get the user profile
app.get("/profile/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findById(token);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});

app.get("/orders/:token",async(req,res) => {
  try{
    const token = req.params.token;
    const userId = jwt.verify(token, secretKey).userId;
    const orders = await Order.find({user: userId}).populate("user");

    if(!orders || orders.length === 0){
      return res.status(404).json({message:"No orders found for this user"})
    }

    res.status(200).json({ orders });
  } catch(error){
    res.status(500).json({ message: "Error"});
  }
})

module.exports = app;
