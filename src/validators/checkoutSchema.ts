import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(5, "Address is too short"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(4, "Invalid postal code"),
  phone: z
    .string()
    .min(10, "Invalid phone number")
    .regex(/^[0-9]+$/, "Phone must be numbers only"),
  paymentMethod: z.enum(["COD", "CARD", "GCASH"], {
    errorMap: () => ({ message: "Select payment method" }),
  }),
});
