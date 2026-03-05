import { DataModal } from "@/components/shared";
import type { DataModalSlotProps } from "@/types/DataModelSlotProps";
import { useSelectPKQuery } from "../api/EXP_CategoryHooks";
import { EXP_CategoryAddEditView } from "../view";

const EXP_CategoryAddEditPage = (props: DataModalSlotProps) => {
    const { selectedRow, showModal, onClose } = props;
    const { data, isLoading } = useSelectPKQuery(
        selectedRow!,
        !!selectedRow && !!showModal
    );

    const isEditing = !!selectedRow;

    return (
        <DataModal
            Component={EXP_CategoryAddEditView}
            modalTitle={isEditing ? "Edit Category" : "Add Category"}
            data={data}
            open={showModal}
            mode={isEditing ? "edit" : "add"}
            isLoading={isLoading}
            handleClose={onClose}
            maxWidth="lg"
            isEditing={isEditing}
        />
    )
}

export default EXP_CategoryAddEditPage;
