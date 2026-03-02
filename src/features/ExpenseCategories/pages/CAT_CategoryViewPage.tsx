import { DataModal } from "@/components/shared";
import type { DataModalSlotProps } from "@/types/DataModelSlotProps";
import { useSelectViewQuery } from "../api/CAT_CategoryHooks";
import { CAT_CategoryDetailView } from "../view";

const CAT_CategoryViewPage = (props: DataModalSlotProps) => {
    const { selectedRow, showModal, onClose } = props;
    const { data, isLoading } = useSelectViewQuery(
        selectedRow!,
        !!selectedRow && !!showModal
    );

    return (
        <DataModal
            Component={CAT_CategoryDetailView}
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

export default CAT_CategoryViewPage;
