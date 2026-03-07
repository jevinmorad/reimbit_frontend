import { api } from "@/api/client";
import type { ApiError, ErrorHandler, OperationResponse, SuccessHandler } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AssignEmployeesToManagerRequest, EmployeeInsertRequest, EmployeeChangeStatusRequest } from "../types";
import { EmployeeEndpoints } from "./EmployeeEndpoints";
import { EmployeeQueries } from "./EmployeeQuery";
import { useEmployeeStore } from "./EmployeeStore";

export const useCreateEmployee = (
    handleSuccess: SuccessHandler,
    handleError: ErrorHandler
) => {
    const queryClient = useQueryClient();
    const { postModel } = useEmployeeStore();

    return useMutation<OperationResponse, ApiError, EmployeeInsertRequest>({
        mutationFn: async (formData: EmployeeInsertRequest) =>
            api.post<OperationResponse>(EmployeeEndpoints.Insert, formData),
        onError: error => {
            handleError(error);
        },
        onSuccess: response => {
            handleSuccess('create', response?.rowsAffected);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: EmployeeQueries.selectPage(postModel).queryKey,
            });
        },
    });
};

export const useAssignEmployeesToManager = (
    handleSuccess: SuccessHandler,
    handleError: ErrorHandler
) => {
    const queryClient = useQueryClient();
    const { postModel } = useEmployeeStore();

    return useMutation<OperationResponse, ApiError, AssignEmployeesToManagerRequest>({
        mutationFn: async (formData: AssignEmployeesToManagerRequest) =>
            api.post<OperationResponse>(EmployeeEndpoints.AssignManager, formData),
        onError: error => {
            handleError(error);
        },
        onSuccess: response => {
            handleSuccess('update', response?.rowsAffected);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: EmployeeQueries.selectPage(postModel).queryKey,
            });
        },
    });
};

export const useChangeEmployeeStatus = (
    handleSuccess: SuccessHandler,
    handleError: ErrorHandler
) => {
    const queryClient = useQueryClient();
    const { postModel } = useEmployeeStore();

    return useMutation<OperationResponse, ApiError, EmployeeChangeStatusRequest>({
        mutationFn: async (formData) =>
            api.patch<OperationResponse>(EmployeeEndpoints.ChangeStatus, formData),
        onError: error => {
            handleError(error);
        },
        onSuccess: response => {
            handleSuccess('update', response?.rowsAffected);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: EmployeeQueries.selectPage(postModel).queryKey,
            });
        },
    });
};
