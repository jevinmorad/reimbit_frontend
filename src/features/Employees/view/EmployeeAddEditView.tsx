import { Field, type DataModalButtons, type DataModalComponentProps } from "@/components/shared";
import { useApiErrorHandler } from "@/features/auth/hooks/useApiErrorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { useCreateEmployee } from "../api/EmployeeMutation";
import { EmployeeInsertRequest } from "../types/EmployeeAddEditTypes";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { EntityId } from "@/hooks/userListView";

export const EmployeeAddEditView = forwardRef<DataModalButtons, DataModalComponentProps<EmployeeInsertRequest>>((props, ref) => {
    const { data, onClose, onLoading } = props;

    const { control, handleSubmit, reset, setError, formState: { isSubmitting }, setValue, watch } = useForm<any>({
        resolver: zodResolver(EmployeeInsertRequest),
        defaultValues: data || {
            firstName: "",
            lastName: "",
            displayName: "",
            email: "",
            mobileNo: "",
            roleId: "" as EntityId,
            isActive: true,
            isPrimaryManager: false
        }
    });

    const isActive = watch("isActive");

    const { handleSuccess, handleError } = useApiErrorHandler({
        setError,
        namespace: "Employee",
        onSuccess: {
            create: () => {
                reset();
                onClose?.();
            },
        },
    });

    const createMutation = useCreateEmployee(handleSuccess, handleError);

    const onSubmit = handleSubmit(async (formData) => {
        await createMutation.mutateAsync(formData);
    });

    useImperativeHandle(ref, () => ({
        onSubmit,
        isPending: createMutation.isPending,
        isSuccess: createMutation.isSuccess,
    }));

    useEffect(() => {
        onLoading?.(isSubmitting);
        return () => onLoading?.(false);
    }, [isSubmitting, onLoading]);

    return (
        <div className="grid grid-cols-12 gap-4">
            <Field.Text
                control={control}
                name="firstName"
                label="First Name"
                placeholder="John"
                gridProps={{ size: { xs: 12, sm: 6 } }}
            />

            <Field.Text
                control={control}
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                gridProps={{ size: { xs: 12, sm: 6 } }}
            />

            <Field.Text
                control={control}
                name="displayName"
                label="Display Name"
                placeholder="John Doe"
                gridProps={{ size: { xs: 12, sm: 12 } }}
            />

            <Field.Text
                control={control}
                name="email"
                label="Email Address"
                placeholder="john.doe@example.com"
                gridProps={{ size: { xs: 12, sm: 7 } }}
            />

            <Field.Text
                control={control}
                name="mobileNo"
                label="Mobile No"
                placeholder="+1 555-555-5555"
                gridProps={{ size: { xs: 12, sm: 5 } }}
            />

            {/* Note: In a real app roleId and managerId would use Field.Select with options from their respective endpoints. 
                Using Text fields as placeholders for IDs for now. */}
            <Field.Text
                control={control}
                name="roleId"
                label="Role ID"
                placeholder="Role ID"
                gridProps={{ size: { xs: 12, sm: 6 } }}
            />

            <Field.Text
                control={control}
                name="managerId"
                label="Manager ID"
                placeholder="Manager ID (Optional)"
                gridProps={{ size: { xs: 12, sm: 6 } }}
            />

            <Field.Image
                control={control}
                name="profileImageUrl"
                label="Profile Image"
                placeholder="Upload Photo"
                gridProps={{ size: { xs: 12, sm: 12 } }}
            />

            <div className="col-span-12 flex items-center space-x-2 mt-2">
                <Checkbox
                    id="isActive"
                    checked={isActive}
                    onCheckedChange={(checked) => setValue("isActive", checked as boolean)}
                />
                <Label htmlFor="isActive" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Active Employee
                </Label>
            </div>
        </div>
    );
});
