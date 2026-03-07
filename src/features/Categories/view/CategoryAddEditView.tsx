import { Field, type DataModalButtons, type DataModalComponentProps } from "@/components/shared";
import { useApiErrorHandler } from "@/features/auth/hooks/useApiErrorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { useCreateCategory, useUpdateCategory } from "../api/CategoryMutation";
import { CategoryAddEditRequest } from "../types";

export const CategoryAddEditView = forwardRef<DataModalButtons, DataModalComponentProps<CategoryAddEditRequest>>((props, ref) => {
    const { data, isEditing, onClose, onLoading } = props;

    const { control, handleSubmit, reset, setError, formState: { isSubmitting } } = useForm<CategoryAddEditRequest>({
        resolver: zodResolver(CategoryAddEditRequest),
        defaultValues: data
    });

    const { handleSuccess, handleError } = useApiErrorHandler({
        setError,
        namespace: "Expense Categories",
        onSuccess: {
            create: () => reset(),
            update: () => onClose?.(),
        },
    });

    const createMutation = useCreateCategory(handleSuccess, handleError);
    const updateMutation = useUpdateCategory(handleSuccess, handleError);

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

    return (
        <div className="grid grid-cols-12 gap-4">
            <Field.Text
                control={control}
                name="CategoryName"
                label="Category Name"
                placeholder="Business, Travel, etc."
                gridProps={{ size: { xs: 12 } }}
            />

            <Field.Text
                control={control}
                name="Description"
                label="Description"
                placeholder="Brief description of this category"
                gridProps={{ size: { xs: 12 } }}
            />
        </div>
    );
});
