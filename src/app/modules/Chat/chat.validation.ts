import { z } from "zod";

const conversationValidationSchema = z.object({
  receiver: z.string(),
});

const messageValidationSchema = z.object({
  conversationId: z.string(),
  receiver: z.string(),
  message: z.string(),
});

export { conversationValidationSchema, messageValidationSchema };
