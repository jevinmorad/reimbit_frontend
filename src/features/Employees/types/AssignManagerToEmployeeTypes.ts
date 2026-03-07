import type { EntityId } from "@/hooks/userListView";
import z from "zod";

export const AssignEmployeesToManagerRequest = z.object({
    ManagerId: z.custom<EntityId>(),
    EmployeeIds: z.array(z.custom<EntityId>()),
    ManagerType: z.number().nullish(),
    IsPrimary: z.boolean().default(false),
    ValidFrom: z.string().nullish(),
    ValidTo: z.string().nullish(),
});

export type AssignEmployeesToManagerRequest = z.infer<typeof AssignEmployeesToManagerRequest>;