import type { EntityId } from "@/hooks/userListView";

export type CategorySelectViewResponse = {
    CategoryId: EntityId;
    CategoryName: string;
    Description: string | null;
}
