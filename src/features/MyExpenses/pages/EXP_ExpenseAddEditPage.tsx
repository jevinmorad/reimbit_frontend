import { DataModal } from "@/components/shared";
import type { DataModalSlotProps } from "@/types/DataModelSlotProps";
import { useSelectPKQuery } from "../api/EXP_ExpenseHooks";
import { EXP_ExpenseAddEditView } from "../view";

const EXP_ExpenseAddEditPage = (props: DataModalSlotProps) => {
    const { selectedRow, showModal, onClose } = props;
    const { data, isLoading } = useSelectPKQuery(
        selectedRow,
        !!selectedRow && !!showModal && true
    );

    const isEditing = !!selectedRow;

    return (
        <DataModal
            Component={EXP_ExpenseAddEditView}
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

export default EXP_ExpenseAddEditPage;