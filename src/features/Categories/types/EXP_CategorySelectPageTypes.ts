import type { EntityId } from "@/hooks/userListView";
import z from "zod";

export const EXP_CategorySelectPageRequest = z.object({
    CategoryName: z.string().nullish(),
})

export type EXP_CategorySelectPageRequest = z.infer<typeof EXP_CategorySelectPageRequest>;

export type EXP_CategorySelectPageResponse = {
    CategoryId: EntityId;
    CategoryName: string;
    Description: string | null;
}
