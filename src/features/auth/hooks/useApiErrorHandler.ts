import type { ErrorHandler, SuccessHandler } from "@/api/types";
import { getAllErrors, getUserMessage, hasValidationErrors } from "@/utils/api-helpers";
import { useCallback, useMemo } from "react";
import { type FieldValues, type Path, type UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
export type UseApiErrorHandlerOptions<TFieldValues extends FieldValues> = {
  setError?: UseFormSetError<TFieldValues>;
  namespace?: string;
  successMessage?: { create?: string; update?: string };
  errorMessage?: { noChanges?: string; general?: string; validation?: string };
  showToast?: boolean;
  onSuccess?: {
    create?: () => void;
    update?: () => void;
  };
};

export type UseApiErrorHandlerReturn = {
  handleSuccess: SuccessHandler;
  handleError: ErrorHandler;
};

type SuccessMessage = { create: string; update: string };
type ErrorMessage = { noChanges: string; general: string; validation: string };

export function useApiErrorHandler<TFieldValues extends FieldValues>({
  setError,
  namespace,
  successMessage: directSuccessMessage,
  errorMessage: directErrorMessage,
  showToast = true,
  onSuccess,
}: UseApiErrorHandlerOptions<TFieldValues> = {}): UseApiErrorHandlerReturn {

  const successMessage = useMemo<SuccessMessage>(() => {
    if (directSuccessMessage && directSuccessMessage.create && directSuccessMessage.update) { 
        return directSuccessMessage as SuccessMessage;
    }
    if (namespace) {
      return {
        create: `${namespace} Created Successfully`,
        update: `${namespace} Updated Successfully`,
      };
    }
    return {
      create: 'Created Successfully',
      update: 'Updated Successfully',
    };
  }, [directSuccessMessage, namespace]);

  // Resolve error messages from namespace or use direct/default messages
  const errorMessage = useMemo<ErrorMessage>(() => {
    if (directErrorMessage && directErrorMessage.noChanges && directErrorMessage.general && directErrorMessage.validation) {
        return directErrorMessage as ErrorMessage;
    }
    if (namespace) {
      return {
        noChanges: `No changes to ${namespace}`,
        general: `Error saving ${namespace}`,
        validation: `Validation error in ${namespace}`,
      };
    }
    return {
      noChanges: 'No changes detected',
      general: 'An error occurred while saving',
      validation: 'Please check the form for errors',
    };
  }, [directErrorMessage, namespace]);

  /**
   * Handle success response with rowsAffected check
   */
  const handleSuccess = useCallback<SuccessHandler>(
    (isEditing, rowsAffected) => {
      // Treat undefined rowsAffected as a success, but 0 as no-op
      const wasSuccessful = rowsAffected === undefined || rowsAffected > 0;

      if (wasSuccessful) {
        if (showToast) {
          toast.success(isEditing ? successMessage.update : successMessage.create);
        }
        // Fire the appropriate onSuccess callback
        if (isEditing) {
          onSuccess?.update?.();
        } else {
          onSuccess?.create?.();
        }
        return;
      }

      // This handles the rowsAffected === 0 case
      if (showToast) {
        toast.error(errorMessage.noChanges);
      }
    },
    [successMessage, errorMessage, showToast, onSuccess]
  );

  /**
   * Handle API error - map validation errors to form, show toast for others
   */
  const handleError = useCallback<ErrorHandler>(
    error => {
      const status = (error as any)?.response?.status;
      const serverMessage = (error as any)?.response?.data?.Message || (error as any)?.response?.data?.message;

      if (error?.message === "Network Error" || (error as any)?.code === "ERR_NETWORK") {
        if (showToast) {
          toast.error("Network Error: Please check your internet connection.");
        }
        return;
      }

      // Hide raw server errors for 500 status codes
      if (status >= 500) {
        if (showToast) {
          toast.error("An internal server error occurred. Please try again later.");
        }
        return;
      }

      // Map validation errors to form fields
      if (hasValidationErrors(error) && setError && error.errors) {
        const errors = getAllErrors(error);

        errors.forEach(({ field, message }) => {
          setError(field as Path<TFieldValues>, {
            type: 'server',
            message,
          });
        });

        // Show toast for validation errors (mask if it looks like a raw system error)
        if (showToast) {
          const msg = getUserMessage(error) || errorMessage.validation;
          toast.error(msg.includes("Exception") ? errorMessage.general : msg);
        }
        return;
      }

      // Show toast for other errors (generic message for unknown errors)
      if (showToast) {
        toast.error(serverMessage || errorMessage.general);
      }
    },
    [setError, errorMessage, showToast]
  );

  return {
    handleSuccess,
    handleError,
  };
}
