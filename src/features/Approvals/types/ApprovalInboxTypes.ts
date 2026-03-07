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
    ExpenseId: z.custom<EntityId>(),
    Status: z.number(),
    Reason: z.string().optional(),
});

export type UpdateExpenseStatusRequest = z.infer<typeof UpdateExpenseStatusRequest>;
