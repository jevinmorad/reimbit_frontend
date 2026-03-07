import { DashboardContent } from "@/components/dashboard-content"
import { GlobalConfirmDialog } from "@/components/global-confirm-dialog"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { useApiErrorHandler } from "@/features/auth/hooks/useApiErrorHandler"
import useListView, { type EntityId } from "@/hooks/userListView"
import { formatCurrency, formatDate } from "@/lib/utils"
import { type ColumnDef } from "@tanstack/react-table"
import { Edit, Eye, Trash2 } from "lucide-react"
import React, { useMemo } from "react"
import { useSelectPageQuery } from "../api/ExpenseHooks"
import { useDeleteExpense } from "../api/ExpenseMutation"
import { useExpenseStore } from "../api/ExpenseStore"
import type { ExpenseSelectPageResponse } from "../types"
import { ExpenseFilterView } from "../view"
import ExpenseAddEditPage from "./ExpenseAddEditPage"
import ExpenseViewPage from "./ExpenseViewPage"

const ExpenseListPage = () => {
    const {
        modal: {
            formView,
            openFilter,
            detailView,
            showAddView,
            closeAddEditView,
            setOpenFilter,
            showEditView,
            showDetailView,
            closeDetailView
        },
        selectedRowId
    } = useListView()

    const { postModel, handlePagination, handleSorting } = useExpenseStore()

    const { handleSuccess, handleError } = useApiErrorHandler({
        namespace: "Expense",
        showToast: true,
    })

    const { data, totalRecords, isLoading } = useSelectPageQuery(postModel, true)

    const deleteMutation = useDeleteExpense(handleSuccess, handleError)

    const [confirmOpen, setConfirmOpen] = React.useState(false)
    const [deleteId, setDeleteId] = React.useState<EntityId | null>(null)

    const handleDelete = (id: EntityId) => {
        setDeleteId(id)
        setConfirmOpen(true)
    }

    const confirmDelete = () => {
        if (deleteId) {
            deleteMutation.mutate(deleteId, {
                onSuccess: () => {
                    // Toast handled globally or query invalidated
                },
                onSettled: () => {
                    setConfirmOpen(false)
                    setDeleteId(null)
                }
            })
        }
    }

    const columns = useMemo<ColumnDef<ExpenseSelectPageResponse>[]>(() => [
        {
            accessorKey: "Created",
            header: "Created",
            cell: ({ row }) => formatDate(row.original.Created)
        },
        {
            accessorKey: "Title",
            header: "Title",
            cell: ({ row }) => (
                <span
                    className="cursor-pointer text-primary hover:underline"
                    onClick={() => showDetailView(row.original.ExpenseId)}
                >
                    {row.getValue("Title")}
                </span>
            )
        },
        {
            accessorKey: "CategoryName",
            header: "Category",
        },
        {
            accessorKey: "Amount",
            header: "Amount",
            cell: ({ row }) => formatCurrency(row.getValue("Amount"), row.original.Currency)
        },
        {
            accessorKey: "Status",
            header: "Status",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary"
                        onClick={() => showDetailView(row.original.ExpenseId)}
                        title="View"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary"
                        onClick={() => showEditView(row.original.ExpenseId)}
                        title="Edit"
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDelete(row.original.ExpenseId)}
                        title="Delete"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ], [showDetailView, showEditView]);

    return (
        <DashboardContent>
            <DataTable
                data={data}
                columns={columns}
                loading={isLoading}
                onFilter={() => setOpenFilter(true)}
                rowCount={totalRecords}
                postModel={postModel}
                onPaginationChange={handlePagination}
                onSortingChange={handleSorting}
                onInsert={showAddView}
            />

            <ExpenseAddEditPage
                showModal={formView}
                selectedRow={selectedRowId}
                onClose={closeAddEditView}
            />

            <ExpenseViewPage
                showModal={detailView}
                selectedRow={selectedRowId}
                onClose={closeDetailView}
            />

            <ExpenseFilterView
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
            />

            <GlobalConfirmDialog
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Expense"
                description="Are you sure you want to delete this expense? This action cannot be undone."
                variant="destructive"
                confirmText="Delete"
            />
        </DashboardContent>
    )
}

export default ExpenseListPage;
