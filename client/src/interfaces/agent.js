import { z } from "zod";

// Define the Agent schema
export const agentSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, "Name must have at least 1 character"),
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email must have at least 1 character"),
  phone: z
    .string()
    .min(1, "Phone must have at least 1 character")
    .regex(/^\+?[0-9]+$/, "Invalid phone format"),
  properties: z.array(z.string()), 
  profilePicture: z.union([z.string(), z.array(z.string())]).optional(),
});

export const validateAgent = (data) => {
  try {
    // Validate the data against the schema
    return agentSchema.parse(data);
  } catch (error) {
    throw error;
  }
};
