import { api } from "@/api/client";
import type { EntityId } from "@/hooks/userListView";
import type { PostModel } from "@/types/api";
import { createQueryKeys } from '@lukemorales/query-key-factory';
import type { EXP_ExpenseAddEditRequest, EXP_ExpenseSelectPageRequest, EXP_ExpenseSelectPageResponse, EXP_ExpenseSelectViewResponse } from "../types";
import { EXP_ExpenseEndpoints } from "./EXP_ExpenseEndpoints";

export const EXP_ExpenseQueries = createQueryKeys('EXP_Expense', {
  selectPage: (postModel: PostModel<EXP_ExpenseSelectPageRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      api.filter<EXP_ExpenseSelectPageResponse, EXP_ExpenseSelectPageRequest>(
        EXP_ExpenseEndpoints.SelectPage,
        postModel
      ),
  }),

  selectPK: (expenseId: EntityId) => ({
    queryKey: [expenseId],
    queryFn: () =>
      api.get<EXP_ExpenseAddEditRequest>(EXP_ExpenseEndpoints.SelectPk(expenseId)),
  }),

  selectView: (expenseId: EntityId) => ({
    queryKey: [expenseId],
    queryFn: () =>
      api.get<EXP_ExpenseSelectViewResponse>(EXP_ExpenseEndpoints.SelectView!(expenseId)),
  }),
});
