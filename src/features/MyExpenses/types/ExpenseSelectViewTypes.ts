export type ExpenseSelectViewResponse = {
    Title: string;
    Amount: number;
    Currency: string;
    Description: string | null;
    ReceiptUrl: string | null;
    ExpenseStatus: string;
    RejectionReason: string | null;
    CategoryName: string;
    UserDisplayName: string;
    CreatedByUserDisplayName: string;
    ModifiedByUserDisplayName: string | null;
    Created: string;
    Modified: string | null;
}