import { api } from "@/api/client";
import type { EntityId } from "@/hooks/userListView";
import type { ApiError, ErrorHandler, OperationResponse, SuccessHandler } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CAT_CategoryAddEditRequest } from "../types";
import { CAT_CategoryEndpoints } from "./CAT_CategoryEndpoints";
import { CAT_CategoryQueries } from "./CAT_CategoryQuery";
import { useCAT_CategoryStore } from "./CAT_CategoryStore";

export const useCreateCAT_Category = (
  handleSuccess: SuccessHandler,
  handleError: ErrorHandler
) => {
  const queryClient = useQueryClient();
  const { postModel } = useCAT_CategoryStore();
  return useMutation<OperationResponse, ApiError, CAT_CategoryAddEditRequest>({
    mutationFn: async (formData: CAT_CategoryAddEditRequest) =>
      api.post<OperationResponse>(CAT_CategoryEndpoints.Insert, formData),
    onError: error => {
      handleError(error);
    },
    onSuccess: response => {
      handleSuccess('create', response?.rowsAffected);
      return { lastUpdated: Date.now() };
    },
    onSettled: (_response, _error, _variables) => {
      queryClient.invalidateQueries({
        queryKey: CAT_CategoryQueries.selectPage(postModel).queryKey,
      });
    },
  });
};

export const useUpdateCAT_Category = (
  handleSuccess: SuccessHandler,
  handleError: ErrorHandler
) => {
  const queryClient = useQueryClient();
  const { postModel } = useCAT_CategoryStore();
  return useMutation<OperationResponse, ApiError, CAT_CategoryAddEditRequest>({
    mutationFn: async (formData: CAT_CategoryAddEditRequest) =>
      api.put<OperationResponse>(CAT_CategoryEndpoints.Update, formData),
    onError: error => {
      handleError(error);
    },
    onSuccess: response => {
      handleSuccess('update', response?.rowsAffected);
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: CAT_CategoryQueries.selectPage(postModel).queryKey,
      });
      if (variables.CategoryId) {
        queryClient.invalidateQueries({
          queryKey: CAT_CategoryQueries.selectPK(variables.CategoryId).queryKey,
        });
      }
    },
  });
};

export const useDeleteCAT_Category = (
  handleSuccess: SuccessHandler,
  handleError: ErrorHandler
) => {
  const queryClient = useQueryClient();
  const { postModel } = useCAT_CategoryStore();
  return useMutation<OperationResponse, ApiError, EntityId>({
    mutationFn: async (categoryId: EntityId) =>
      api.delete<OperationResponse>(CAT_CategoryEndpoints.Delete(categoryId)),
    onError: error => {
      handleError(error);
    },
    onSuccess: response => {
      handleSuccess('delete', response?.rowsAffected);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: CAT_CategoryQueries.selectPage(postModel).queryKey,
      });
    },
  });
};
