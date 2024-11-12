import { Router } from "express";
import validateData from "../../middlewares/validateData";
import {
  setUserPinSchemaValidation,
  updateUserInfoValidation,
  updateUserPinSchemaValidation,
  userLoginSchemaValidation,
  userSchemaValidation,
  verifyUserPinSchemaValidation,
} from "./user.validation";
import { UserController } from "./user.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post(
  "/register",
  validateData(userSchemaValidation),
  UserController.createUser,
);

router.put(
  "/update-info",
  auth(),
  validateData(updateUserInfoValidation),
  UserController.updateUserInfo,
);

router.post(
  "/login",
  validateData(userLoginSchemaValidation),
  UserController.loginUser,
);
router.get("/get-balance", auth(), UserController.getBalance);

router.get("/pin-info", auth(), UserController.getUserPinInfo);

router.put(
  "/set-pin",
  auth(),
  validateData(setUserPinSchemaValidation),
  UserController.setUserPin,
);

router.put(
  "/update-pin",
  auth(),
  validateData(updateUserPinSchemaValidation),
  UserController.updateUserPin,
);

router.post(
  "/verify-pin",
  auth(),
  validateData(verifyUserPinSchemaValidation),
  UserController.verifyUserPin,
);

router.get("/users", auth(), UserController.getAllUsers);

export const UserRoutes = router;
