import mongoose from "mongoose";
import { decodeToken } from "../../utils/decodeToken";
import { User } from "../User/user.model";
import { TTransaction } from "./transaction.interface";
import { UserTransaction } from "./transaction.model";

const addMoneyInDb = async (token: string, payload: TTransaction) => {
  const decoded = decodeToken(token);
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      throw new Error("User not found");
    }

    const newBalance = user.balance + payload.amount;

    await User.findByIdAndUpdate(
      user._id,
      { balance: newBalance },
      { new: true, session },
    );

    const result = await UserTransaction.create(
      [
        {
          amount: payload.amount,
          transactionType: "add-money",
        },
      ],
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw new Error("Something went wrong!");
  }
};

const sendOrMakePaymentInDb = async (token: string, payload: TTransaction) => {
  const decoded = decodeToken(token);
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findOne({ email: decoded.email });
    const receiver = await User.findOne({ accountNumber: payload.sender });

    if (!user || !receiver) {
      throw new Error("User or receiver not found");
    }

    if (payload.amount > user?.balance) {
      throw new Error("Insufficient balance");
    }

    const newUserBalance = user?.balance - payload.amount;
    const newReceiverBalance = receiver?.balance + payload.amount;

    await User.findByIdAndUpdate(
      user._id,
      { balance: newUserBalance },
      { new: true, session },
    );

    await User.findByIdAndUpdate(
      receiver?._id,
      { balance: newReceiverBalance },
      { new: true, session },
    );

    const result = await UserTransaction.create(
      [
        {
          amount: payload.amount,
          transactionType: payload.transactionType,
          sender: user.accountNumber,
          receiver: receiver?.accountNumber,
        },
      ],
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw new Error("Something went wrong!");
  }
};

/*
const getUserTransactionsFromDb = async (username: string) => {
  const result = await Transaction.find({ transactionMadeBy: username });
  const meta = await Transaction.aggregate([
    {
      $match: {
        sender: username,
      },
    },
    {
      $group: {
        _id: "$transactionType",
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);
  return {
    meta,
    result,
  };
};
*/

export const TransactionServices = { addMoneyInDb, sendOrMakePaymentInDb };
