import { Router } from "express";
import validateData from "../../middlewares/validateData";
import {
  userLoginSchemaValidation,
  userSchemaValidation,
} from "./user.validation";
import { createUser, getBalance, loginUser } from "./user.controller";

const router = Router();

router.post("/register", validateData(userSchemaValidation), createUser);
router.post("/login", validateData(userLoginSchemaValidation), loginUser);
router.get("/get-balance/:email", getBalance);

export const UserRoutes = router;
