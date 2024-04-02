import { Router } from "express";
import validateData from "../../middlewares/validateData";
import { transactionSchemaValidation } from "./transaction.validation";
import { getTransactions, makeTransaction } from "./transaction.controller";

const router = Router();

router.post(
  "/make-transaction",
  validateData(transactionSchemaValidation),
  makeTransaction,
);
router.get("/get-transactions/:username", getTransactions);

export const TransactionRoutes = router;
