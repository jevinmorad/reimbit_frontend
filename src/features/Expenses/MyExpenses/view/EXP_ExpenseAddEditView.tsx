import { DataModalButtons, DataModalComponentProps } from "@/components/shared/DataModal";
import { Field } from "@/components/shared/Field";
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { useCreateEXP_Expense, useUpdateEXP_Expense } from "../api/EXP_ExpenseMutation";
import { EXP_ExpenseAddEditRequest } from "../types/EXP_ExpenseAddEditTypes";

export const EXP_ExpenseAddEditView = forwardRef<DataModalButtons, DataModalComponentProps<EXP_ExpenseAddEditRequest>>((props, ref) => {
    const { data, isEditing, onClose } = props;

    const { control, handleSubmit, reset, setError } = useForm<EXP_ExpenseAddEditRequest>({
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

    const onSubmit = handleSubmit((formData) => {
        mutation.mutate(formData);
    });

    useImperativeHandle(ref, () => ({
        onSubmit,
        isPending: mutation.isPending,
        isSuccess: mutation.isSuccess,
    }));

    return (
        <div className="grid grid-cols-12 gap-4">
            <Field.Text
                control={control}
                name="title"
                label="Title"
                placeholder="Expense Title"
                gridProps={{ size: { xs: 12 } }}
            />

            <Field.Number
                control={control}
                name="amount"
                label="Amount"
                placeholder="0.00"
                gridProps={{ size: { xs: 12, sm: 6 } }}
            />

            <Field.Select
                control={control}
                name="currency"
                label="Currency"
                placeholder="Select Currency"
                options={[
                    { label: "USD", value: "USD" },
                    { label: "EUR", value: "EUR" },
                    { label: "INR", value: "INR" },
                ]}
                gridProps={{ size: { xs: 12, sm: 6 } }}
            />

            <Field.Select
                control={control}
                name="categoryId"
                label="Category"
                placeholder="Select Category"
                options={[
                    { label: "Food", value: "CAT-001" },
                    { label: "Travel", value: "CAT-002" },
                    { label: "Office", value: "CAT-003" },
                ]}
                gridProps={{ size: { xs: 12, sm: 6 } }}
            />
        </div>
    );
});