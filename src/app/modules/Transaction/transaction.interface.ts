export type TTransaction={
    amount: number;
    transactionType : "add-money" | "send-money" | "make-payment" | "request-loan";
    sender?: string;
    receiver: string;
    transactionMadeBy: string;
}