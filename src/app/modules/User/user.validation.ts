import { z } from "zod";

const userSchemaValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const userLoginSchemaValidation = z.object({
  email: z.string(),
  password: z.string(),
});

export { userSchemaValidation, userLoginSchemaValidation };
