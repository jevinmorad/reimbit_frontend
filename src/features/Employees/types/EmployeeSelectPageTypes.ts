import type { EntityId } from "@/hooks/userListView";

export type EmployeeSelectPageResponse = {
    EmployeeId: EntityId;
    EmployeeName: string;
    Email: string;
    Role: string;
    ManagerId: EntityId | null;
    ManagerName: string | null;
    IsActive: boolean;
};