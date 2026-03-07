import type { EntityId } from "@/hooks/userListView";
import z from "zod";

export type ApprovalInboxListRequest = {
    status: number | null;
};

export type ApprovalInboxListResponse = {
    ExpenseId: EntityId;
    EmployeeId: EntityId;
    EmployeeName: string;
    Title: string;
    Amount: number;
    Currency: string;
    CategoryName: string;
    Created: string;
    ReceiptUrl: string | null;
};

export const UpdateExpenseStatusRequest = z.object({
    expenseId: z.custom<EntityId>(),
    status: z.number(),
    reason: z.string().optional(),
});

export type UpdateExpenseStatusRequest = z.infer<typeof UpdateExpenseStatusRequest>;
