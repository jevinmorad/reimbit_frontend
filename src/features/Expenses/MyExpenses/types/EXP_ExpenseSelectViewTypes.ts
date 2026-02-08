export type EXP_ExpenseSelectViewResponse = {
    title: string;
    amount: number;
    currency: string;
    description: string;
    attachmentUrl: string;
    expenseStatus: string;
    rejectionReason: string;
    categoryName: string;
    userDisplayName: string;
    createdByUserDisplayName: string;
    modifiedByUserDisplayName: string;
    created: Date;
    modified: Date;
}