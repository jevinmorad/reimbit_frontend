import type { EntityId } from "@/hooks/userListView";
import type { ApiError, ErrorHandler, OperationResponse, SuccessHandler } from "@/types/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api/client";

import { ExpenseAddEditRequest } from "../types";
import { ExpenseEndpoints } from "./ExpenseEndpoints";
import { ExpenseQueries } from "./ExpenseQuery";
import { useExpenseStore } from "./ExpenseStore";

export const useCreateExpense = (
  handleSuccess: SuccessHandler,
  handleError: ErrorHandler
) => {
  const queryClient = useQueryClient();
  const { postModel } = useExpenseStore();
  return useMutation<OperationResponse, ApiError, ExpenseAddEditRequest>({
    mutationFn: async (formData: ExpenseAddEditRequest) =>
      api.post<OperationResponse>(ExpenseEndpoints.Insert, formData),
    onError: error => {
      handleError(error);
    },
    onSuccess: response => {
      handleSuccess('create', response?.rowsAffected);
      return { lastUpdated: Date.now() };
    },
    onSettled: (_response, _error, _variables) => {
      queryClient.invalidateQueries({
        queryKey: ExpenseQueries.selectPage(postModel).queryKey,
      });
    },
  });
};

export const useUpdateExpense = (
  handleSuccess: SuccessHandler,
  handleError: ErrorHandler
) => {
  const queryClient = useQueryClient();
  const { postModel } = useExpenseStore();
  return useMutation<OperationResponse, ApiError, ExpenseAddEditRequest>({
    mutationFn: async (formData: ExpenseAddEditRequest) =>
      api.put<OperationResponse>(ExpenseEndpoints.Update, formData),
    onError: error => {
      handleError(error);
    },
    onSuccess: response => {
      handleSuccess('update', response?.rowsAffected);
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ExpenseQueries.selectPage(postModel).queryKey,
      });
      if (variables.ExpenseId) {
        queryClient.invalidateQueries({
          queryKey: ExpenseQueries.selectPK(variables.ExpenseId).queryKey,
        });
      }
    },
  });
};

export const useDeleteExpense = (
  handleSuccess: SuccessHandler,
  handleError: ErrorHandler
) => {
  const queryClient = useQueryClient();
  const { postModel } = useExpenseStore();
  return useMutation<OperationResponse, ApiError, EntityId>({
    mutationFn: async (expenseId: EntityId) =>
      api.delete<OperationResponse>(ExpenseEndpoints.Delete(expenseId)),
    onError: error => {
      handleError(error);
    },
    onSuccess: response => {
      handleSuccess('delete', response?.rowsAffected);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ExpenseQueries.selectPage(postModel).queryKey,
      });
    },
  });
};