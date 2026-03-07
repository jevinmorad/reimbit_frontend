import { DataModal } from "@/components/shared";
import type { DataModalSlotProps } from "@/types/DataModelSlotProps";
import { useSelectViewQuery } from "../api/CategoryHooks";
import { CategoryDetailView } from "../view";

const CategoryViewPage = (props: DataModalSlotProps) => {
    const { selectedRow, showModal, onClose } = props;
    const { data, isLoading } = useSelectViewQuery(
        selectedRow!,
        !!selectedRow && !!showModal
    );

    return (
        <DataModal
            Component={CategoryDetailView}
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

export default CategoryViewPage;
