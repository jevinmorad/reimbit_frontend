import { DashboardContent } from "@/components/dashboard-content"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import useListView, { type EntityId } from "@/hooks/userListView"
import { type ColumnDef } from "@tanstack/react-table"
import { Ban, CheckCircle, Eye } from "lucide-react"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEmployeeSelectPageQuery } from "../api/EmployeeHooks"
import { useEmployeeStore } from "../api/EmployeeStore"
import EmployeeViewPage from "./EmployeeViewPage"
import type { EmployeeSelectPageResponse } from "../types"
import { useChangeEmployeeStatus } from "../api/EmployeeMutation"
import { useApiErrorHandler } from "@/features/auth/hooks/useApiErrorHandler"
import { GlobalConfirmDialog } from "@/components/global-confirm-dialog"

const EmployeeListPage = () => {
    const navigate = useNavigate()

    const {
        modal: {
            detailView,
            showDetailView,
            closeDetailView
        },
        selectedRowId
    } = useListView()

    const { postModel, handlePagination, handleSorting } = useEmployeeStore()
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [statusChangePayload, setStatusChangePayload] = useState<{ userId: EntityId; isActive: boolean } | null>(null)

    const { handleSuccess, handleError } = useApiErrorHandler({
        namespace: "Employee",
    });

    const statusMutation = useChangeEmployeeStatus(handleSuccess, handleError)

    const handleStatusChangeClick = (userId: EntityId, isActive: boolean) => {
        setStatusChangePayload({ userId, isActive })
        setConfirmOpen(true)
    }

    const confirmStatusChange = () => {
        if (statusChangePayload) {
            statusMutation.mutate(statusChangePayload, {
                onSettled: () => {
                    setConfirmOpen(false)
                    setStatusChangePayload(null)
                }
            })
        }
    }

    const { data, totalRecords, isLoading } = useEmployeeSelectPageQuery(postModel, true)

    const columns = useMemo<ColumnDef<EmployeeSelectPageResponse>[]>(() => [
        {
            accessorKey: "EmployeeName",
            header: "Employee Name",
            cell: ({ row }) => (
                <span
                    className="cursor-pointer text-primary hover:underline font-medium"
                    onClick={() => showDetailView(row.original.EmployeeId)}
                >
                    {row.original.EmployeeName}
                </span>
            )
        },
        {
            accessorKey: "Email",
            header: "Email",
        },
        {
            accessorKey: "Role",
            header: "Role",
        },
        {
            accessorKey: "ManagerName",
            header: "Manager",
            cell: ({ row }) => (
                <span
                    className="cursor-pointer text-primary hover:underline font-medium"
                    onClick={() => row.original.ManagerId && showDetailView(row.original.ManagerId)}
                >
                    {row.original.ManagerId ? row.original.ManagerName : "-"}
                </span>
            )
        },
        {
            accessorKey: "IsActive",
            header: "Status",
            cell: ({ row }) => row.getValue("IsActive") ? "Active" : "Inactive"
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary hover:bg-primary/10"
                        onClick={() => showDetailView(row.original.EmployeeId)}
                        title="View Profile"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    {row.original.IsActive ? (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                            onClick={() => handleStatusChangeClick(row.original.EmployeeId, false)}
                            title="Deactivate Employee"
                        >
                            <Ban className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-emerald-600 hover:bg-emerald-600/10"
                            onClick={() => handleStatusChangeClick(row.original.EmployeeId, true)}
                            title="Activate Employee"
                        >
                            <CheckCircle className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            ),
        },
    ], [showDetailView]);

    return (
        <DashboardContent>
            <DataTable
                data={data}
                columns={columns}
                loading={isLoading}
                rowCount={totalRecords}
                postModel={postModel}
                onPaginationChange={handlePagination}
                onSortingChange={handleSorting}
                onInsert={() => navigate("/Employees/add")}
            />

            <EmployeeViewPage
                showModal={detailView}
                selectedRow={selectedRowId}
                onClose={closeDetailView}
            />

            <GlobalConfirmDialog
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={confirmStatusChange}
                title={statusChangePayload?.isActive ? "Activate Employee" : "Deactivate Employee"}
                description={statusChangePayload?.isActive
                    ? "Are you sure you want to activate this employee? They will regain their system access."
                    : "Are you sure you want to deactivate this employee? This action will revoke all of their permissions."}
                variant={statusChangePayload?.isActive ? "default" : "destructive"}
                confirmText={statusChangePayload?.isActive ? "Activate" : "Deactivate"}
            />
        </DashboardContent>
    )
}

export default EmployeeListPage;