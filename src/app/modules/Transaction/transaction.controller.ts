import catchAsync from "../../utils/catchAsync";
import {
  getUserTransactionsFromDb,
  makeTransactionIntoDb,
} from "./transaction.services";

const makeTransaction = catchAsync(async (req, res) => {
  const result = await makeTransactionIntoDb(req.body);

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "Transaction done successfully",
    data: result,
  });
});

const getTransactions = catchAsync(async (req, res) => {
  const { username } = req.params;
  const { meta, result } = await getUserTransactionsFromDb(username);

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "Transactions fetched successfully",
    meta,
    data: result,
  });
});

export { makeTransaction, getTransactions };
