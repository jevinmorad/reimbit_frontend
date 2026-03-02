import type { EntityId } from "@/hooks/userListView";

export type CAT_CategorySelectViewResponse = {
    CategoryId: EntityId;
    CategoryName: string;
    Description: string | null;
}
