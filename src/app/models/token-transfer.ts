// interface model of token transfer object
export interface TokenTransfer {
    to: string;
    from: string;
    amount: string;
    userEmail: string;
    receiptNumber: Number;
}