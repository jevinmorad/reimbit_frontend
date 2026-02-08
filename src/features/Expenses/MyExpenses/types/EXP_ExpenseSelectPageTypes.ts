import { EntityId } from "@/hooks/userListView";
import z from "zod";

export const EXP_ExpenseSelectPageRequest = z.object({
    userId: z.string().nullish(),
    title: z.string().nullish(),
    status: z.string().nullish(),
    categoryId: z.string().nullish(),
    fromDate: z.string().nullish(),
    toDate: z.string().nullish(),
})

export type EXP_ExpenseSelectPageRequest = z.infer<typeof EXP_ExpenseSelectPageRequest>;

export type EXP_ExpenseSelectPageResponse = {
    expenseId: EntityId;
    created: string;
    title: string;
    categoryId: EntityId;
    categoryName: string;
    amount: number;
    currency: string;
    status: string;
}