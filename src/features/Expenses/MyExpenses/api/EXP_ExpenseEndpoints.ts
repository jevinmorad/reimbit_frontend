import { EntityId } from "@/hooks/userListView";

export const EXP_ExpenseEndpoints = {
    selectPage: `/api/expense/selectPage`,
    insert: `/api/expense/insert`,
    update: `/api/expense/update`,
    delete: (expenseId: EntityId) => `/api/expense/delete/${expenseId}`,
    selectPk: (expenseId: EntityId) => `/api/expense/${expenseId}`,
    selectView: (expenseId: EntityId) => `/api/expense/selectView/${expenseId}`,
}