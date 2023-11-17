import mongoose from "mongoose";
import Property from "../models/property.js";
import User from "../models/user.js";

export const getPropertys = async (req, res) => {
  try {
    const propertys = await Property.find();
    res.status(200).json(propertys);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch property." });
  }
};

export const addProperty = async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      location,
      bedrooms,
      bathrooms,
      area,
      status,
      type,
      images,
      creator,
    } = req.body;

    //start a session
    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({email: creator }).session(session);

    if (!user) throw new Error("User not found");

    let property = new Property(req.body);

    property = await property.save();

    user.allProperties.push(property._id);
    await user.save({ session });

    await session.commitTransaction();
    res.status(201).json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ error: "Failed to add property." });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    // Validate the provided ID
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID." });
    }

    // Update the properties with the new values from the request body
    const result = await Property.findByIdAndUpdate(
      { _id: propertyId },
      { $set: req.body },
      { new: true }
    ).lean();

    if (!result) {
      return res.status(404).json({ error: "property not found." });
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to update property." });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    // Validate the provided ID
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID." });
    }

    // Update the properties with the new values from the request body
    const result = await Property.deleteOne({ _id: propertyId });

    if (!result) {
      return res.status(404).json({ error: "property not found." });
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to update property." });
  }
};
