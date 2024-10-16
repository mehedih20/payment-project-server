import { Router } from "express";
import validateData from "../../middlewares/validateData";
import {
  addMoneyValidationSchema,
  sendOrMakePaymentValidationSchema,
} from "./transaction.validation";
import { TransactionController } from "./transaction.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post(
  "/add-money",
  auth(),
  validateData(addMoneyValidationSchema),
  TransactionController.addMoney,
);

router.post(
  "/send-or-make-payment",
  auth(),
  validateData(sendOrMakePaymentValidationSchema),
  TransactionController.sendOrMakePayment,
);

export const TransactionRoutes = router;
