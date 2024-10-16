import { z } from "zod";

const addMoneyValidationSchema = z.object({
  amount: z.number(),
});

const sendOrMakePaymentValidationSchema = z.object({
  amount: z.number(),
  transactionType: z.enum(["send-money", "make-payment"]),
  receiver: z.number(),
});

export { addMoneyValidationSchema, sendOrMakePaymentValidationSchema };
