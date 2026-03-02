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
      api.post<OperationResponse>(EXP_ExpenseEndpoints.Insert, formData),
    onError: error => {
      handleError(error);
    },
    onSuccess: response => {
      handleSuccess('create', response?.rowsAffected);
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
      api.put<OperationResponse>(EXP_ExpenseEndpoints.Update, formData),
    onError: error => {
      handleError(error);
    },
    onSuccess: response => {
      handleSuccess('update', response?.rowsAffected);
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: EXP_ExpenseQueries.selectPage(postModel).queryKey,
      });
      if (variables.ExpenseId) {
        queryClient.invalidateQueries({
          queryKey: EXP_ExpenseQueries.selectPK(variables.ExpenseId).queryKey,
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
      api.delete<OperationResponse>(EXP_ExpenseEndpoints.Delete(expenseId)),
    onError: error => {
      handleError(error);
    },
    onSuccess: response => {
      handleSuccess('delete', response?.rowsAffected);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: EXP_ExpenseQueries.selectPage(postModel).queryKey,
      });
    },
  });
};