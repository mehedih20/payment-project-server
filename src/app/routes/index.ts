import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { TransactionRoutes } from "../modules/Transaction/transaction.route";
import { ChatRoutes } from "../modules/Chat/chat.route";

const router = Router();

const allModelRoutes = [UserRoutes, TransactionRoutes, ChatRoutes];

allModelRoutes.forEach((item) => router.use(item));

export default router;
