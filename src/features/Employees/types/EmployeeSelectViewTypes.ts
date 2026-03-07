export type EmployeeSelectViewResponse = {
    Name: string;
    Role: string | null;
    ManagerName: string | null;
    TotalExpense: number | string;
    Created: string;
    CreatedByUserName: string | null;
    Modified: string | null;
    ModifiedByUserName: string | null;
};