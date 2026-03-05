import { Field, type DataModalButtons, type DataModalComponentProps } from "@/components/shared";
import { useApiErrorHandler } from "@/features/auth/hooks/useApiErrorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { useSelectComboBox } from "../../Categories/api/EXP_CategoryHooks";
import { useCreateEXP_Expense, useUpdateEXP_Expense } from "../api/EXP_ExpenseMutation";
import { EXP_ExpenseAddEditRequest } from "../types/EXP_ExpenseAddEditTypes";

export const EXP_ExpenseAddEditView = forwardRef<DataModalButtons, DataModalComponentProps<EXP_ExpenseAddEditRequest>>((props, ref) => {
    const { data, isEditing, onClose, onLoading } = props;

    const { control, handleSubmit, reset, setError, formState: { isSubmitting } } = useForm<EXP_ExpenseAddEditRequest>({
        resolver: zodResolver(EXP_ExpenseAddEditRequest),
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

    const createMutation = useCreateEXP_Expense(handleSuccess, handleError);
    const updateMutation = useUpdateEXP_Expense(handleSuccess, handleError);

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
        </div>
    );
});