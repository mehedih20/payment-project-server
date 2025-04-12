import { Router } from "express";
import validateData from "../../middlewares/validateData";
import { auth } from "../../middlewares/auth";
import { HistoryValidation } from "./history.validation";
import { HistoryController } from "./history.controller";

const router = Router();

router.post(
  "/history",
  auth(),
  validateData(HistoryValidation.historyValidationSchema),
  HistoryController.createHistory,
);

router.get("/history", auth(), HistoryController.getHistory);

export const HistoryRoutes = router;
