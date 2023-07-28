import { z } from "zod";

export const propertySchema = z.object({
  _id: z.string(),
  title: z
    .string()
    .min(1, "Title must have at least 1 character")
    .max(100, "Title must have at most 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z
    .number({
      invalid_type_error: "Price must be a number",
      required_error: "Price is required",
    })
    .nullable()
    .refine(
      (val) => val === null || (typeof val === "number" && val >= 0),
      "Invalid Price"
    ),
  location: z.string().min(3, "Location must have at least 3 characters"),
  bedrooms: z
    .number({
      invalid_type_error: "Number of bedrooms must be a number",
      required_error: "Number of bedrooms is required",
    })
    .nullable()
    .refine(
      (val) => val === null || (typeof val === "number" && val >= 0),
      "Invalid number of bedrooms"
    ),
  bathrooms: z
    .number({
      invalid_type_error: "Number of bathrooms must be a number",
      required_error: "Number of bathrooms is required",
    })
    .nullable()
    .refine(
      (val) => val === null || (typeof val === "number" && val >= 0),
      "Invalid number of bathrooms"
    ),
  area: z
    .number({
      invalid_type_error: "Area must be a number",
      required_error: "Area is required",
    })
    .nullable()
    .refine(
      (val) => val === null || (typeof val === "number" && val >= 0),
      "Invalid Area"
    ),
  amenities: z
    .array(z.string())
    .min(1, "At least one amenity must be selected"),
  images: z.union([z.string(), z.array(z.string())]).optional(),
});

export const validateProperty = (data) => {
  try {
    // Validate the data against the schema
    return propertySchema.parse(data);
  } catch (error) {
    throw error;
  }
};
