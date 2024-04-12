import { User } from "../User/user.model";
import { TTransaction } from "./transaction.interface";
import { Transaction } from "./transaction.model";

const makeTransactionIntoDb = async (payload: TTransaction) => {
  const result = await Transaction.create(payload);
  const sender = await User.findOne({ username: payload.sender });
  const receiver = await User.findOne({ username: payload.receiver });
  if (result) {
    // Add money
    if (payload.transactionType === "add-money") {
      if (receiver) {
        const newBalance = receiver.balance + payload.amount;
        await User.findByIdAndUpdate(receiver._id, { balance: newBalance });
      }
    }

    // Send money / Make payment
    if (
      payload.transactionType === "send-money" ||
      payload.transactionType === "make-payment"
    ) {
      if (sender && receiver) {
        if ((sender?.balance as number) >= payload.amount) {
          const newSenderBalance = (sender?.balance as number) - payload.amount;
          const senderResponse = await User.findByIdAndUpdate(sender?._id, {
            balance: newSenderBalance,
          });

          if (senderResponse) {
            const newReceiverBalance = receiver.balance + payload.amount;
            await User.findByIdAndUpdate(receiver._id, {
              balance: newReceiverBalance,
            });
          }
        }
      }
    }
  }

  return result;
};

const getUserTransactionsFromDb = async (username: string) => {
  const result = await Transaction.find({ transactionMadeBy: username });
  const meta = await Transaction.aggregate([
    {
      $match: {
        transactionMadeBy: username,
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

export { makeTransactionIntoDb, getUserTransactionsFromDb };
