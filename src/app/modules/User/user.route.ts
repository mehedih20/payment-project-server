import { Router } from "express";
import validateData from "../../middlewares/validateData";
import {
  userLoginSchemaValidation,
  userSchemaValidation,
} from "./user.validation";
import { UserController } from "./user.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post(
  "/register",
  validateData(userSchemaValidation),
  UserController.createUser,
);

router.post(
  "/login",
  validateData(userLoginSchemaValidation),
  UserController.loginUser,
);

export const UserRoutes = router;
