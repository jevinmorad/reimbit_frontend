import type { EntityId } from "@/hooks/userListView";
import z from "zod";

export const EXP_ExpenseAddEditRequest = z.object({
    ExpenseId: z.string().nullish(),
    Title: z.string("Title is required"),
    CategoryId: z.string("Category is required"),
    Amount: z.number("Amount is required"),
    Currency: z.string("Currency is required"),
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