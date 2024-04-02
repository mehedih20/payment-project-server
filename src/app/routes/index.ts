import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { TransactionRoutes } from "../modules/Transaction/transaction.route";

const router = Router();

const allModelRoutes = [UserRoutes, TransactionRoutes];

allModelRoutes.forEach((item) => router.use(item));

export default router;
