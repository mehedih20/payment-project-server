export type TTransaction = {
  amount: number;
  transactionType: "add-money" | "send-money" | "make-payment";
  sender?: number;
  receiver?: number;
};
