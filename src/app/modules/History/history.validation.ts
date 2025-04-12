import { z } from "zod";

const predictionSchema = z.object({
  condition: z.string(),
  positive: z.boolean(),
  score: z.number(),
});

export const historyValidationSchema = z.object({
  doctorEmail: z.string().email(),
  patientName: z.string().min(1),
  patientAge: z.string().min(1),
  patientHeight: z.string().min(1),
  patientWeight: z.string().min(1),
  prediction: z.array(predictionSchema),
});

export const HistoryValidation = {
  historyValidationSchema,
};
