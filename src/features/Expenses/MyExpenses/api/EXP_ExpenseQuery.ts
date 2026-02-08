import { api } from "@/api/client";
import { EntityId } from "@/hooks/userListView";
import { PostModel } from "@/types/api";
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { EXP_ExpenseAddEditRequest, EXP_ExpenseSelectPageRequest, EXP_ExpenseSelectPageResponse, EXP_ExpenseSelectViewResponse } from "../types";
import { EXP_ExpenseEndpoints } from "./EXP_ExpenseEndpoints";

export const EXP_ExpenseQueries = createQueryKeys('EXP_Expense', {
  selectPage: (postModel: PostModel<EXP_ExpenseSelectPageRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      api.filter<EXP_ExpenseSelectPageResponse, EXP_ExpenseSelectPageRequest>(
        EXP_ExpenseEndpoints.selectPage,
        postModel
      ),
  }),

  selectPK: (expenseId: EntityId) => ({
    queryKey: [expenseId],
    queryFn: () =>
      api.get<EXP_ExpenseAddEditRequest>(EXP_ExpenseEndpoints.selectPk(expenseId)),
  }),

  selectView: (expenseId: EntityId) => ({
    queryKey: [expenseId],
    queryFn: () =>
      api.get<EXP_ExpenseSelectViewResponse>(EXP_ExpenseEndpoints.selectView!(expenseId)),
  }),
});
