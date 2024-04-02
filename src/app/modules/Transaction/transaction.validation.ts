import { z } from "zod";

const transactionSchemaValidation = z.object({
    amount: z.number(),
    transactionType : z.enum(["add-money" , "send-money" , "make-payment" , "request-loan"]),
    receiver: z.string(),
    transactionMadeBy: z.string()
})

export {transactionSchemaValidation}