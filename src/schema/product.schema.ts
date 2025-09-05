import { z } from "zod";

export const productSchema = z.object({
  sellerId: z.string().min(1),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  quantity: z.number().min(0, "Quantity cannot be negative"),
  category: z.enum(["ELECTRONICS", "FASHION", "HOME", "BOOKS", "TOYS"]),
});

export type ProductFormValues = z.infer<typeof productSchema>;
