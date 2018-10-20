
export interface UserReceipt {
    status: string; //
    amount: number; //
    userEmail: string; //
    verificationCode: string; //
    codeExpiration: string; //
    receiptNumber: number; //
    user: string;
    exchanger: string;
    exchangerEmail: string;
    adminComment: string,
    adminSubmitDate: string,
    exchangerComment: string;
    exchangerSubmitDate: string;
    userComment: string;
    userSubmitDate: string;
}

export interface UserInfo {
    KYCCode: string;
    KYCUpdated: Boolean;
    KYCVerified: Boolean;
    SignedContract: Boolean;
    balance: Number;
    birthDate: string;
    email: string;
    firstName: string;
    lastName: string;
    hasWallet: Boolean;
    imageAddress: string;
    passportImageAddress: string;
    registeredDate: string;
    telephone: string;
}