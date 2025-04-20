export interface Transaction {
    profileName: string;
    transactionDate: string; // LocalDateTime is typically represented as Date in TypeScript
    transactionAmount: number; // Long is represented as number in TypeScript
    transactionNarrative: string;
    transactionDescription: string;
    transactionID: number; // Long is represented as number in TypeScript
    transactionType: number; // Integer is represented as number in TypeScript
    walletReference: string;
    correlation: number; // Float is represented as number in TypeScript
}