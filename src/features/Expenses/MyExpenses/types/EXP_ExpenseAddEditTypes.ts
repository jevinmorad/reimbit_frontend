import type { EntityId } from "@/hooks/userListView";
import z from "zod";

export const EXP_ExpenseAddEditRequest = z.object({
    ExpenseId: z.string().nullish(),
    Title: z.string(),
    CategoryId: z.string(),
    Amount: z.number(),
    Currency: z.string(),
})

export type EXP_ExpenseAddEditRequest = z.infer<typeof EXP_ExpenseAddEditRequest>

export type EXP_ExpenseAddEditResponse = {
    ExpenseId: EntityId;
    Created: string;
    Title: string;
    CategoryId: EntityId;
    CategoryName: string;
    Amount: number;
    Currency: string;
    Status: string;
}