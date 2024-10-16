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

const setUserPinSchemaValidation = z.object({
  newPin: z.number(),
});

const updateUserPinSchemaValidation = z.object({
  oldPin: z.number(),
  newPin: z.number(),
});

const verifyUserPinSchemaValidation = z.object({
  userPin: z.number(),
});

export {
  userSchemaValidation,
  userLoginSchemaValidation,
  setUserPinSchemaValidation,
  updateUserPinSchemaValidation,
  verifyUserPinSchemaValidation,
};
