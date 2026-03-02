import { DataModal } from "@/components/shared";
import type { DataModalSlotProps } from "@/types/DataModelSlotProps";
import { useSelectViewQuery } from "../api/EXP_ExpenseHooks";
import { EXP_ExpenseDetailView } from "../view/EXP_ExpenseDetailView";

const EXP_ExpenseViewPage = ({ selectedRow, showModal, onClose }: DataModalSlotProps) => {

    const { data, isLoading } = useSelectViewQuery(
        selectedRow,
        !!selectedRow && !!showModal
    );

    return (
        <DataModal
            Component={EXP_ExpenseDetailView}
            data={data}
            mode="view"
            isLoading={isLoading}
            handleClose={onClose}
            modalTitle={data?.Title ? data.Title : "View Expense"}
            open={showModal}
            maxWidth="xl"
        />
    );
};

export default EXP_ExpenseViewPage;