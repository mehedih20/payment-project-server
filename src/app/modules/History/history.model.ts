import { Schema, model } from "mongoose";
import { THistory, TPrediction } from "./history.interface";

const PredictionSchema = new Schema<TPrediction>(
  {
    condition: { type: String, required: true },
    positive: { type: Boolean, required: true },
    score: { type: Number, required: true },
  },
  { _id: false },
);

const historySchema = new Schema<THistory>(
  {
    doctorEmail: {
      type: String,
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    patientAge: {
      type: String,
      required: true,
    },
    patientHeight: {
      type: String,
      required: true,
    },
    patientWeight: {
      type: String,
      required: true,
    },
    prediction: { type: [PredictionSchema], required: true },
  },
  {
    timestamps: true,
  },
);

export const History = model<THistory>("History", historySchema);
