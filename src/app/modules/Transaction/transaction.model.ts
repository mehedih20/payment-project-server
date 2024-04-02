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
      enum: ["add-money", "send-money", "make-payment", "request-loan"],
      required: true,
    },
    sender: {
      type: String,
    },
    receiver: {
      type: String,
      required: true,
    },
    transactionMadeBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Transaction = model<TTransaction>(
  "Transaction",
  transactionSchema,
);
