import { DataModal } from "@/components/shared";
import type { DataModalSlotProps } from "@/types/DataModelSlotProps";
import { useSelectViewQuery } from "../api/ExpenseHooks";
import { ExpenseDetailView } from "../view/ExpenseDetailView";

const ExpenseViewPage = ({ selectedRow, showModal, onClose }: DataModalSlotProps) => {

    const { data, isLoading } = useSelectViewQuery(
        selectedRow,
        !!selectedRow && !!showModal
    );

    return (
        <DataModal
            Component={ExpenseDetailView}
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

export default ExpenseViewPage;