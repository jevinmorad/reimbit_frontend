import { DataModal } from "@/components/shared";
import type { DataModalSlotProps } from "@/types/DataModelSlotProps";
import { useEmployeeSelectViewQuery } from "../api/EmployeeHooks";
import { EmployeeDetailView } from "../view/EmployeeDetailView";

const EmployeeViewPage = ({ selectedRow, showModal, onClose }: DataModalSlotProps) => {

    const { data, isLoading } = useEmployeeSelectViewQuery(
        selectedRow,
        !!selectedRow && !!showModal
    );

    return (
        <DataModal
            Component={EmployeeDetailView}
            data={data}
            mode="view"
            isLoading={isLoading}
            handleClose={onClose}
            modalTitle={data?.Name ? data.Name : "Employee Details"}
            open={showModal}
            maxWidth="xl"
        />
    );
};

export default EmployeeViewPage;
