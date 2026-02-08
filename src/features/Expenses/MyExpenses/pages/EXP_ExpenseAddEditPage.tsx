import { DataModal } from "@/components/shared";
import { DataModalSlotProps } from "@/types/DataModelSlotProps";
import { useSelectPKQuery } from "../api/EXP_ExpenseHooks";
import { EXP_ExpenseAddEditView } from "../view";

const EXP_ExpenseAddEditPage = (props: DataModalSlotProps) => {
    const { selectedRow, showModal, onClose } = props;
    const { data, isLoading } = useSelectPKQuery(
        selectedRow,
        !!selectedRow && !!showModal && true
    );

    return (
        <DataModal
            Component={EXP_ExpenseAddEditView}
            modalTitle={data?.expenseId ? "Add Expense" : "Edit Expense"}
            data={data}
            open={showModal}
            mode={"edit"}
            isLoading={isLoading}
            handleClose={onClose}
            maxWidth="md"
            isEditing={!!selectedRow}
        />
    )
}

export default EXP_ExpenseAddEditPage;