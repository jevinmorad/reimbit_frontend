import { api } from "@/api/client";
import type { EntityId } from "@/hooks/userListView";
import type { ApiError, ErrorHandler, OperationResponse, SuccessHandler } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryAddEditRequest } from "../types";
import { CategoryEndpoints } from "./CategoryEndpoints";
import { CategoryQueries } from "./CategoryQuery";
import { useCategoryStore } from "./CategoryStore";

export const useCreateCategory = (
  handleSuccess: SuccessHandler,
  handleError: ErrorHandler
) => {
  const queryClient = useQueryClient();
  const { postModel } = useCategoryStore();
  return useMutation<OperationResponse, ApiError, CategoryAddEditRequest>({
    mutationFn: async (formData: CategoryAddEditRequest) =>
      api.post<OperationResponse>(CategoryEndpoints.Insert, formData),
    onError: error => {
      handleError(error);
    },
    onSuccess: response => {
      handleSuccess('create', response?.rowsAffected);
      return { lastUpdated: Date.now() };
    },
    onSettled: (_response, _error, _variables) => {
      queryClient.invalidateQueries({
        queryKey: CategoryQueries.SelectPage(postModel).queryKey,
      });
    },
  });
};

export const useUpdateCategory = (
  handleSuccess: SuccessHandler,
  handleError: ErrorHandler
) => {
  const queryClient = useQueryClient();
  const { postModel } = useCategoryStore();
  return useMutation<OperationResponse, ApiError, CategoryAddEditRequest>({
    mutationFn: async (formData: CategoryAddEditRequest) =>
      api.put<OperationResponse>(CategoryEndpoints.Update, formData),
    onError: error => {
      handleError(error);
    },
    onSuccess: response => {
      handleSuccess('update', response?.rowsAffected);
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: CategoryQueries.SelectPage(postModel).queryKey,
      });
      if (variables.CategoryId) {
        queryClient.invalidateQueries({
          queryKey: CategoryQueries.SelectPK(variables.CategoryId).queryKey,
        });
      }
    },
  });
};

export const useDeleteCategory = (
  handleSuccess: SuccessHandler,
  handleError: ErrorHandler
) => {
  const queryClient = useQueryClient();
  const { postModel } = useCategoryStore();
  return useMutation<OperationResponse, ApiError, EntityId>({
    mutationFn: async (categoryId: EntityId) =>
      api.delete<OperationResponse>(CategoryEndpoints.Delete(categoryId)),
    onError: error => {
      handleError(error);
    },
    onSuccess: response => {
      handleSuccess('delete', response?.rowsAffected);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: CategoryQueries.SelectPage(postModel).queryKey,
      });
    },
  });
};
