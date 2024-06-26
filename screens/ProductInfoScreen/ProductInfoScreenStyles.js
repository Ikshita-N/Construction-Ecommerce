import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const height = (width * 100) / 100;

const styles = StyleSheet.create({
  container: {
    marginTop: 55,
    flex: 1,
    backgroundColor: "white",
  },
  imageBackground: {
    width,
    height: height,
    marginTop: 25,
    resizeMode: "contain",
  },
  discountBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#C60C30",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  favButtonContainer: {
    position: "absolute",
    bottom: -300,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: "auto",
    marginLeft: 330,
    marginBottom: 20,
  },
  favIcon: {
    fontSize: 24,
    color: "black",
  },
  productTitle: {
    fontWeight: "500",
    fontSize: 18,
    marginRight: 5,
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 6,
  },
  mrpText: {
    fontSize: 15,
    fontWeight: "300",
    marginTop: 6,
  },
  descriptionText: {
    fontSize: 15,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryLabel: {
    fontSize: 15,
    fontWeight: "bold",
  },
  keyFeaturesContainer: {
    padding: 10,
  },
  keyFeatureText: {
    fontSize: 15,
  },
  specificationsContainer: {
    padding: 10,
  },
  specificationText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  totalContainer: {
    padding: 10,
  },
  totalText: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 15,
  },
  deliveryText: {
    color: "#00CED1",
  },
  deliverToContainer: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    gap: 5,
  },
  locationIcon: {
    fontSize: 24,
    color: "black",
  },
  inStockText: {
    color: "green",
    marginHorizontal: 10,
    fontWeight: "500",
  },
  buttonContainer: {
    backgroundColor: "#FFC72C",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 15,
  },
  buyNowButtonContainer: {
    backgroundColor: "#FFAC1C",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  reviewsContainer: {
    padding: 10,
  },
  reviewText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  reviewerText: {
    fontWeight: "bold",
  },
  reviewRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewCommentText: {
    fontSize: 15,
  },
  reviewDateText: {
    fontSize: 15,
  },
});

export default styles;
