import type { EntityId } from "@/hooks/userListView";
import z from "zod";

export const CAT_CategorySelectPageRequest = z.object({
    CategoryName: z.string().nullish(),
})

export type CAT_CategorySelectPageRequest = z.infer<typeof CAT_CategorySelectPageRequest>;

export type CAT_CategorySelectPageResponse = {
    CategoryId: EntityId;
    CategoryName: string;
    Description: string | null;
}
