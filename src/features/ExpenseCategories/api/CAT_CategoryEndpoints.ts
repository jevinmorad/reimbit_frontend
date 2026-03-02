import type { EntityId } from "@/hooks/userListView";

export const CAT_CategoryEndpoints = {
    SelectPage: `/api/ExpenseCategory/SelectPage`,
    Insert: `/api/ExpenseCategory/Insert`,
    Update: `/api/ExpenseCategory`,
    Delete: (categoryId: EntityId) => `/api/ExpenseCategory/${categoryId}`,
    SelectPk: (categoryId: EntityId) => `/api/ExpenseCategory/${categoryId}`,
    SelectView: (categoryId: EntityId) => `/api/ExpenseCategory/${categoryId}`,
    SelectComboBox: `/api/ExpenseCategory/SelectComboBox`,
}
