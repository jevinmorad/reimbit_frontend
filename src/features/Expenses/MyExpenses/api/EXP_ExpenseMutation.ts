import type { EntityId } from "@/hooks/userListView";
import type { ApiError, ErrorHandler, OperationResponse, SuccessHandler } from "@/types/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api/client";

import { EXP_ExpenseAddEditRequest } from "../types";
import { EXP_ExpenseEndpoints } from "./EXP_ExpenseEndpoints";
import { EXP_ExpenseQueries } from "./EXP_ExpenseQuery";
import { useEXP_ExpenseStore } from "./EXP_ExpenseStore";

export const useCreateEXP_Expense = (
  handleSuccess: SuccessHandler,
  handleError: ErrorHandler
) => {
  const queryClient = useQueryClient();
  const { postModel } = useEXP_ExpenseStore();
  return useMutation<OperationResponse, ApiError, EXP_ExpenseAddEditRequest>({
    mutationFn: async (formData: EXP_ExpenseAddEditRequest) =>
      api.post<OperationResponse>(EXP_ExpenseEndpoints.insert, formData),
    onError: error => {
      handleError(error);
    },
    onSuccess: response => {
      handleSuccess(false, response?.rowsAffected);
      return { lastUpdated: Date.now() };
    },
    onSettled: (_response, _error, _variables) => {
      queryClient.invalidateQueries({
        queryKey: EXP_ExpenseQueries.selectPage(postModel).queryKey,
      });
    },
  });
};

export const useUpdateEXP_Expense = (
  handleSuccess: SuccessHandler,
  handleError: ErrorHandler
) => {
  const queryClient = useQueryClient();
  const { postModel } = useEXP_ExpenseStore();
  return useMutation<OperationResponse, ApiError, EXP_ExpenseAddEditRequest>({
    mutationFn: async (formData: EXP_ExpenseAddEditRequest) =>
      api.put<OperationResponse>(EXP_ExpenseEndpoints.update, formData),
    onError: error => {
      handleError(error);
    },
    onSuccess: response => {
      handleSuccess(true, response?.rowsAffected);
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: EXP_ExpenseQueries.selectPage(postModel).queryKey,
      });
      if (variables.expenseId) {
        queryClient.invalidateQueries({
          queryKey: EXP_ExpenseQueries.selectPK(variables.expenseId).queryKey,
        });
      }
    },
  });
};

export const useDeleteEXP_Expense = (
  handleSuccess: SuccessHandler,
  handleError: ErrorHandler
) => {
  const queryClient = useQueryClient();
  const { postModel } = useEXP_ExpenseStore();
  return useMutation<OperationResponse, ApiError, EntityId>({
    mutationFn: async (expenseId: EntityId) =>
      api.delete<OperationResponse>(EXP_ExpenseEndpoints.delete(expenseId)),
    onError: error => {
      handleError(error);
    },
    onSuccess: response => {
      handleSuccess(true, response?.rowsAffected);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: EXP_ExpenseQueries.selectPage(postModel).queryKey,
      });
    },
  });
};