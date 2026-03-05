import type { EntityId } from "@/hooks/userListView";

export type EXP_CategorySelectViewResponse = {
    CategoryId: EntityId;
    CategoryName: string;
    Description: string | null;
}
