import type { EntityId } from "@/hooks/userListView";
import z from "zod";

export const EXP_ExpenseSelectPageRequest = z.object({
    UserId: z.string().nullish(),
    Title: z.string().nullish(),
    Status: z.string().nullish(),
    CategoryId: z.string().nullish(),
    FromDate: z.string().nullish(),
    ToDate: z.string().nullish(),
})

export type EXP_ExpenseSelectPageRequest = z.infer<typeof EXP_ExpenseSelectPageRequest>;

export type EXP_ExpenseSelectPageResponse = {
    ExpenseId: EntityId;
    Created: string;
    Title: string;
    CategoryId: EntityId;
    CategoryName: string;
    Amount: number;
    Currency: string;
    Status: string;
}