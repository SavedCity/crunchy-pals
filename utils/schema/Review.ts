import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
    // minlength: 5,
  },
  rating: {
    type: Number,
    // required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  placeOfPurchase: {
    type: String,
    // required: true,
  },
  createdBy: {
    type: String,
    // required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reviews =
  mongoose.models.Review || mongoose.model("Review", ProductSchema);

export default Reviews;
