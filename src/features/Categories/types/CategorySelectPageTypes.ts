import type { EntityId } from "@/hooks/userListView";
import z from "zod";

export const CategorySelectPageRequest = z.object({
    CategoryName: z.string().nullish(),
})

export type CategorySelectPageRequest = z.infer<typeof CategorySelectPageRequest>;

export type CategorySelectPageResponse = {
    CategoryId: EntityId;
    CategoryName: string;
    Description: string | null;
}
