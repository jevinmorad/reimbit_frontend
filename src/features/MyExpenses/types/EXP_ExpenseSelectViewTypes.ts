export type EXP_ExpenseSelectViewResponse = {
    Title: string;
    Amount: number;
    Currency: string;
    Description: string | null;
    AttachmentUrl: string | null;
    ExpenseStatus: string;
    RejectionReason: string | null;
    CategoryName: string;
    UserDisplayName: string;
    CreatedByUserDisplayName: string;
    ModifiedByUserDisplayName: string | null;
    Created: string;
    Modified: string | null;
}