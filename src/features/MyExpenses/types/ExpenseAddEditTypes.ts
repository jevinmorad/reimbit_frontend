import type { EntityId } from "@/hooks/userListView";
import z from "zod";

export const ExpenseAddEditRequest = z.object({
    ExpenseId: z.string().nullish(),
    Title: z.string("Title is required"),
    CategoryId: z.string("Category is required"),
    Amount: z.number("Amount is required"),
    Currency: z.string("Currency is required"),
    ReceiptUrl: z.string().nullish(),
})

export type ExpenseAddEditRequest = z.infer<typeof ExpenseAddEditRequest>

export type ExpenseAddEditResponse = {
    ExpenseId: EntityId;
    Created: string;
    Title: string;
    CategoryId: EntityId;
    CategoryName: string;
    Amount: number;
    Currency: string;
    Status: string;
}