import type { EntityId } from "@/hooks/userListView";

export const EmployeeEndpoints = {
    Insert: `/api/Employee`,
    List: `/api/Employee/SelectPage`,
    AssignManager: `/api/Employee/assign-manager`,
    SelectView: (userId: EntityId) => `/api/Employee/${userId}`,
    ChangeStatus: `/api/Employee/ChangeStatus`,
};