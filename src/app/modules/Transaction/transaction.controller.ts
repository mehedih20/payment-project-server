import catchAsync from "../../utils/catchAsync";
import { TransactionServices } from "./transaction.services";

const addMoney = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await TransactionServices.addMoneyInDb(
    token as string,
    req.body,
  );

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "Add money successfull",
    data: result,
  });
});

const sendOrMakePayment = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await TransactionServices.sendOrMakePaymentInDb(
    token as string,
    req.body,
  );
  const transactionType = (req.body.transactionType as string)
    .split("-")
    .join(" ");

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: `${transactionType} successfull`,
    data: result,
  });
});

const getUserTransactions = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await TransactionServices.getUserTransactionsFromDb(
    token as string,
  );

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "User transactions fetched successfully",
    data: result,
  });
});

export const TransactionController = {
  addMoney,
  sendOrMakePayment,
  getUserTransactions,
};
