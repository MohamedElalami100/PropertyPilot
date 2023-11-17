import mongoose from "mongoose";

// Define the Property schema
const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  type: {
    type: [String], // an array of strings representing types
    default: [],
  },
  status: {
    type: [String], // an array of strings representing amenities
    default: [],
  },
  images: {
    type: [String], // an array of strings representing image URLs
    default: [],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
  }
});

// Create the Property model
const Property = mongoose.model("Property", propertySchema);

export default Property;
