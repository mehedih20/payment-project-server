import catchAsync from "../../utils/catchAsync";
import { HistoryServices } from "./history.services";

const createHistory = catchAsync(async (req, res) => {
  const result = await HistoryServices.createHistory(req.body);

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "History creation successfull",
    result,
  });
});

const getHistory = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await HistoryServices.getHistory(token as string);

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "History fetch successfull",
    result,
  });
});

export const HistoryController = {
  createHistory,
  getHistory,
};
