import type { EntityId } from "@/hooks/userListView";

export const ExpenseEndpoints = {
    SelectPage: `/api/Expense/SelectPage`,
    Insert: `/api/Expense/Insert`,
    Update: `/api/Expense/Update`,
    Delete: (expenseId: EntityId) => `/api/Expense/Delete/${expenseId}`,
    SelectPk: (expenseId: EntityId) => `/api/Expense/SelectPK/${expenseId}`,
    SelectView: (expenseId: EntityId) => `/api/Expense/View/${expenseId}`,
}