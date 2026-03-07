import { api } from "@/api/client";
import type { EntityId } from "@/hooks/userListView";
import type { PostModel } from "@/types/api";
import { createQueryKeys } from '@lukemorales/query-key-factory';
import type { ExpenseAddEditRequest, ExpenseSelectPageRequest, ExpenseSelectPageResponse, ExpenseSelectViewResponse } from "../types";
import { ExpenseEndpoints } from "./ExpenseEndpoints";

export const ExpenseQueries = createQueryKeys('Expense', {
  selectPage: (postModel: PostModel<ExpenseSelectPageRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      api.filter<ExpenseSelectPageResponse, ExpenseSelectPageRequest>(
        ExpenseEndpoints.SelectPage,
        postModel
      ),
  }),

  selectPK: (expenseId: EntityId) => ({
    queryKey: [expenseId],
    queryFn: () =>
      api.get<ExpenseAddEditRequest>(ExpenseEndpoints.SelectPk(expenseId)),
  }),

  selectView: (expenseId: EntityId) => ({
    queryKey: [expenseId],
    queryFn: () =>
      api.get<ExpenseSelectViewResponse>(ExpenseEndpoints.SelectView!(expenseId)),
  }),
});
