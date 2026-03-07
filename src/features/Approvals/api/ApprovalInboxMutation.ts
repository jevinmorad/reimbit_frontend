import { api } from "@/api/client";
import type { ApiError, ErrorHandler, OperationResponse, SuccessHandler } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateExpenseStatusRequest } from "../types/ApprovalInboxTypes";
import { ApprovalInboxEndpoints } from "./ApprovalInboxEndpoints";
import { ApprovalInboxQueries } from "./ApprovalInboxQuery";
import { useApprovalInboxStore } from "./ApprovalInboxStore";

export const useUpdateExpenseStatus = (
    handleSuccess: SuccessHandler,
    handleError: ErrorHandler
) => {
    const queryClient = useQueryClient();
    const { postModel } = useApprovalInboxStore();

    return useMutation<OperationResponse, ApiError, UpdateExpenseStatusRequest>({
        mutationFn: async (formData: UpdateExpenseStatusRequest) =>
            api.patch<OperationResponse>(ApprovalInboxEndpoints.StatusUpdate, formData),
        onError: error => {
            handleError(error);
        },
        onSuccess: response => {
            handleSuccess('update', response?.rowsAffected);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ApprovalInboxQueries.list(postModel).queryKey,
            });
        },
    });
};
