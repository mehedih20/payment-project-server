import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { HistoryRoutes } from "../modules/History/history.route";

const router = Router();

const allModelRoutes = [UserRoutes, HistoryRoutes];

allModelRoutes.forEach((item) => router.use(item));

export default router;
