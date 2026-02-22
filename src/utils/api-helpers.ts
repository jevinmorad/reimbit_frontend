import type { ApiError } from "@/api/types";

export const hasValidationErrors = (error: ApiError | unknown): boolean => {
    if (!error || typeof error !== 'object') return false;
    const apiError = error as ApiError;
    return !!apiError.errors && Object.keys(apiError.errors).length > 0;
};

export const getAllErrors = (error: ApiError): { field: string; message: string }[] => {
    if (!error.errors) return [];
    
    return Object.entries(error.errors).flatMap(([field, messages]) => 
        messages.map(message => ({ field, message }))
    );
};

export const getUserMessage = (error: ApiError | unknown): string => {
    if (!error) return "";
    
    const apiError = error as ApiError;
    if (apiError.title) return apiError.title;
    
    if (error instanceof Error) return error.message;
    
    return "An unexpected error occurred.";
};
