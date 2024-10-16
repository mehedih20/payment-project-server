import { Schema, model } from "mongoose";
import { TTransaction } from "./transaction.interface";

const transactionSchema = new Schema<TTransaction>(
  {
    amount: {
      type: Number,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["add-money", "send-money", "make-payment"],
      required: true,
    },
    sender: {
      type: Number,
    },
    receiver: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

export const UserTransaction = model<TTransaction>(
  "Transaction",
  transactionSchema,
);
