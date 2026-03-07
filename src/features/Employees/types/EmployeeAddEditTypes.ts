import type { EntityId } from "@/hooks/userListView";
import z from "zod";

export const EmployeeInsertRequest = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    displayName: z.string().min(1, "Display Name is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    mobileNo: z.string().min(1, "Mobile No is required"),
    profileImageUrl: z.string().nullish(),
    roleId: z.custom<EntityId>(),
    managerId: z.custom<EntityId>().nullish(),
    managerType: z.number().nullish(),
    isPrimaryManager: z.boolean().default(false),
    managerValidFrom: z.string().nullish(),
    managerValidTo: z.string().nullish(),
    isActive: z.boolean().default(true),
});

export type EmployeeInsertRequest = z.infer<typeof EmployeeInsertRequest>;
