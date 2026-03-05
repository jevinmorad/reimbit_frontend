import { DataModal } from "@/components/shared";
import type { DataModalSlotProps } from "@/types/DataModelSlotProps";
import { useSelectViewQuery } from "../api/EXP_CategoryHooks";
import { EXP_CategoryDetailView } from "../view";

const EXP_CategoryViewPage = (props: DataModalSlotProps) => {
    const { selectedRow, showModal, onClose } = props;
    const { data, isLoading } = useSelectViewQuery(
        selectedRow!,
        !!selectedRow && !!showModal
    );

    return (
        <DataModal
            Component={EXP_CategoryDetailView}
            modalTitle="Category Details"
            data={data}
            open={showModal}
            mode="view"
            isLoading={isLoading}
            handleClose={onClose}
            maxWidth="lg"
        />
    )
}

export default EXP_CategoryViewPage;
