import { DataModal } from "@/components/shared";
import type { DataModalSlotProps } from "@/types/DataModelSlotProps";
import { useSelectPKQuery } from "../api/ExpenseHooks";
import { ExpenseAddEditView } from "../view";

const ExpenseAddEditPage = (props: DataModalSlotProps) => {
    const { selectedRow, showModal, onClose } = props;
    const { data, isLoading } = useSelectPKQuery(
        selectedRow,
        !!selectedRow && !!showModal && true
    );

    const isEditing = !!selectedRow;

    return (
        <DataModal
            Component={ExpenseAddEditView}
            modalTitle={isEditing ? "Edit Expense" : "Add Expense"}
            data={data}
            open={showModal}
            mode={isEditing ? "edit" : "add"}
            isLoading={isLoading}
            handleClose={onClose}
            maxWidth="xl"
            isEditing={isEditing}
        />
    )
}

export default ExpenseAddEditPage;