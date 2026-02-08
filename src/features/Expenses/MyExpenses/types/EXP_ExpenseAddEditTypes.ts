import { EntityId } from "@/hooks/userListView";
import z from "zod";

export const EXP_ExpenseAddEditRequest = z.object({
    expenseId: z.string().nullish(),
    title: z.string(),
    categoryId: z.string(),
    amount: z.number(),
    currency: z.string(),
})

export type EXP_ExpenseAddEditRequest = z.infer<typeof EXP_ExpenseAddEditRequest>

export type EXP_ExpenseAddEditResponse = {
    expenseId: EntityId;
    created: string;
    title: string;
    categoryId: EntityId;
    categoryName: string;
    amount: number;
    currency: string;
    status: string;
}