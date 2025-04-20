import type { Transaction } from "./Transaction";

export interface Reconciliation {
    fileName: string;
    totalRecords: number;
    matchedRecords: number;
    unmatchedRecords: number;
    unmatchedList: Transaction[];
}