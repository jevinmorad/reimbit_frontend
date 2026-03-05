import { api } from "@/api/client";
import type { EntityId } from "@/hooks/userListView";
import type { ApiError, ErrorHandler, OperationResponse, SuccessHandler } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EXP_CategoryAddEditRequest } from "../types";
import { EXP_CategoryEndpoints } from "./EXP_CategoryEndpoints";
import { EXP_CategoryQueries } from "./EXP_CategoryQuery";
import { useEXP_CategoryStore } from "./EXP_CategoryStore";

export const useCreateEXP_Category = (
  handleSuccess: SuccessHandler,
  handleError: ErrorHandler
) => {
  const queryClient = useQueryClient();
  const { postModel } = useEXP_CategoryStore();
  return useMutation<OperationResponse, ApiError, EXP_CategoryAddEditRequest>({
    mutationFn: async (formData: EXP_CategoryAddEditRequest) =>
      api.post<OperationResponse>(EXP_CategoryEndpoints.Insert, formData),
    onError: error => {
      handleError(error);
    },
    onSuccess: response => {
      handleSuccess('create', response?.rowsAffected);
      return { lastUpdated: Date.now() };
    },
    onSettled: (_response, _error, _variables) => {
      queryClient.invalidateQueries({
        queryKey: EXP_CategoryQueries.SelectPage(postModel).queryKey,
      });
    },
  });
};

export const useUpdateEXP_Category = (
  handleSuccess: SuccessHandler,
  handleError: ErrorHandler
) => {
  const queryClient = useQueryClient();
  const { postModel } = useEXP_CategoryStore();
  return useMutation<OperationResponse, ApiError, EXP_CategoryAddEditRequest>({
    mutationFn: async (formData: EXP_CategoryAddEditRequest) =>
      api.put<OperationResponse>(EXP_CategoryEndpoints.Update, formData),
    onError: error => {
      handleError(error);
    },
    onSuccess: response => {
      handleSuccess('update', response?.rowsAffected);
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: EXP_CategoryQueries.SelectPage(postModel).queryKey,
      });
      if (variables.CategoryId) {
        queryClient.invalidateQueries({
          queryKey: EXP_CategoryQueries.SelectPK(variables.CategoryId).queryKey,
        });
      }
    },
  });
};

export const useDeleteEXP_Category = (
  handleSuccess: SuccessHandler,
  handleError: ErrorHandler
) => {
  const queryClient = useQueryClient();
  const { postModel } = useEXP_CategoryStore();
  return useMutation<OperationResponse, ApiError, EntityId>({
    mutationFn: async (categoryId: EntityId) =>
      api.delete<OperationResponse>(EXP_CategoryEndpoints.Delete(categoryId)),
    onError: error => {
      handleError(error);
    },
    onSuccess: response => {
      handleSuccess('delete', response?.rowsAffected);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: EXP_CategoryQueries.SelectPage(postModel).queryKey,
      });
    },
  });
};
