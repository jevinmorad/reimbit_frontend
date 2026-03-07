import type { EntityId } from "@/hooks/userListView";
import { z } from "zod";

export const EmployeeChangeStatusRequest = z.object({
    userId: z.custom<EntityId>(),
    isActive: z.boolean()
});

export type EmployeeChangeStatusRequest = z.infer<typeof EmployeeChangeStatusRequest>;
