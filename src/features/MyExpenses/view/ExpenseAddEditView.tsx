import { Field, type DataModalButtons, type DataModalComponentProps } from "@/components/shared";
import { useApiErrorHandler } from "@/features/auth/hooks/useApiErrorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { useSelectComboBox } from "../../Categories/api/CategoryHooks";
import { useCreateExpense, useUpdateExpense } from "../api/ExpenseMutation";
import { ExpenseAddEditRequest } from "../types/ExpenseAddEditTypes";

export const ExpenseAddEditView = forwardRef<DataModalButtons, DataModalComponentProps<ExpenseAddEditRequest>>((props, ref) => {
    const { data, isEditing, onClose, onLoading } = props;

    const { control, handleSubmit, reset, setError, formState: { isSubmitting } } = useForm<ExpenseAddEditRequest>({
        resolver: zodResolver(ExpenseAddEditRequest),
        defaultValues: data
    });

    const { handleSuccess, handleError } = useApiErrorHandler({
        setError,
        namespace: "Expenses",
        onSuccess: {
            create: () => reset(),
            update: () => onClose?.(),
        },
    });

    const createMutation = useCreateExpense(handleSuccess, handleError);
    const updateMutation = useUpdateExpense(handleSuccess, handleError);

    const mutation = isEditing ? updateMutation : createMutation;

    const onSubmit = handleSubmit(async (formData) => {
        await mutation.mutateAsync(formData);
    });

    useImperativeHandle(ref, () => ({
        onSubmit,
        isPending: mutation.isPending,
        isSuccess: mutation.isSuccess,
    }));

    useEffect(() => {
        onLoading?.(isSubmitting);
        return () => onLoading?.(false);
    }, [isSubmitting, onLoading]);

    const categories = useSelectComboBox();

    return (
        <div className="grid grid-cols-12 gap-4">
            <Field.Text
                control={control}
                name="Title"
                label="Title"
                placeholder="Expense Title"
                gridProps={{ size: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6 } }}
            />

            <Field.Number
                control={control}
                name="Amount"
                label="Amount"
                placeholder="0.00"
                gridProps={{ size: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6 } }}
            />

            <Field.Select
                control={control}
                name="Currency"
                label="Currency"
                placeholder="Select Currency"
                options={[
                    { Label: "USD", Value: "USD" },
                    { Label: "EUR", Value: "EUR" },
                    { Label: "INR", Value: "INR" },
                ]}
                gridProps={{ size: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6 } }}
            />

            <Field.Select
                control={control}
                name="CategoryId"
                label="Category"
                placeholder="Select Category"
                options={categories?.data ?? []}
                gridProps={{ size: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6 } }}
            />

            <Field.Image
                control={control}
                name="ReceiptUrl"
                label="ReceiptUrl"
                placeholder="Upload Receipt"
                gridProps={{ size: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 } }}
            />
        </div>
    );
});