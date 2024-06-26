import { z } from "zod";

const userSchemaValidation = z.object({
  username: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  photoUrl: z.string(),
});

const userLoginSchemaValidation = z.object({
  username: z.string(),
  password: z.string(),
});

export { userSchemaValidation, userLoginSchemaValidation };
