export const JWT_ACCESS_KEY = "AccessToken";
export const JWT_REFRESH_KEY = "RefreshToken";
export const JWT_STORAGE_KEY = "accessToken";

export const ExpenseStatus = {
    Submitted: 1,
    UnderApproval: 2,
    Approved: 3,
    Rejected: 4,
    Paid: 5
} as const;

export type ExpenseStatus = typeof ExpenseStatus[keyof typeof ExpenseStatus];