import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { DataTable } from "@/components/ui/data-table"
import { useApiErrorHandler } from "@/features/auth/hooks/useApiErrorHandler"
import useListView, { type EntityId } from "@/hooks/userListView"
import { formatCurrency, formatDate } from "@/lib/utils"
import { type ColumnDef } from "@tanstack/react-table"
import { Edit, Eye, Trash2 } from "lucide-react"
import React, { useMemo } from "react"
import { useSelectPageQuery } from "../api/EXP_ExpenseHooks"
import { useDeleteEXP_Expense } from "../api/EXP_ExpenseMutation"
import { useEXP_ExpenseStore } from "../api/EXP_ExpenseStore"
import type { EXP_ExpenseSelectPageResponse } from "../types"
import { EXP_ExpenseFilterView } from "../view"
import EXP_ExpenseAddEditPage from "./EXP_ExpenseAddEditPage"
import EXP_ExpenseViewPage from "./EXP_ExpenseViewPage"

const EXP_ExpenseListPage = () => {
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

    const { postModel, handlePagination, handleSorting } = useEXP_ExpenseStore()

    // Provide a namespace for the error handler
    const { handleSuccess, handleError } = useApiErrorHandler({
        namespace: "Expense",
        showToast: true,
    })

    const { data: expenses, totalRecords, isLoading } = useSelectPageQuery(postModel, true)

    // Pass the handlers to the mutation hook
    const deleteMutation = useDeleteEXP_Expense(handleSuccess, handleError)

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

    const columns = useMemo<ColumnDef<EXP_ExpenseSelectPageResponse>[]>(() => [
        {
            accessorKey: "created",
            header: "Created",
            cell: ({ row }) => formatDate(row.getValue("created"))
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <span
                    className="cursor-pointer text-primary hover:underline"
                    onClick={() => showDetailView(row.original.expenseId)}
                >
                    {row.getValue("title")}
                </span>
            )
        },
        {
            accessorKey: "categoryName",
            header: "Category",
        },
        {
            accessorKey: "amount",
            header: "Amount",
            cell: ({ row }) => formatCurrency(row.getValue("amount"), row.original.currency)
        },
        {
            accessorKey: "status",
            header: "Status",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary"
                        onClick={() => showDetailView(row.original.expenseId)}
                        title="View"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary"
                        onClick={() => showEditView(row.original.expenseId)}
                        title="Edit"
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDelete(row.original.expenseId)}
                        title="Delete"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )
        }
    ], [showDetailView, showEditView]);

    return (
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <DataTable
                data={expenses}
                columns={columns}
                loading={isLoading}
                onFilter={() => setOpenFilter(true)}
                rowCount={totalRecords}
                pagination={{
                    pageIndex: postModel.pageOffset,
                    pageSize: postModel.pageSize,
                }}
                onPaginationChange={handlePagination}
                sorting={[{ id: postModel.sortField || 'created', desc: postModel.sortOrder === 'desc' }]}
                onSortingChange={handleSorting}
                onInsert={showAddView}
                onEdit={(row) => showEditView(row.expenseId)}
                onDelete={(row) => handleDelete(row.expenseId)}
                onView={(row) => showDetailView(row.expenseId)}
            />

            <EXP_ExpenseAddEditPage
                showModal={formView}
                selectedRow={selectedRowId}
                onClose={closeAddEditView}
            />

            <EXP_ExpenseViewPage
                showModal={detailView}
                selectedRow={selectedRowId}
                onClose={closeDetailView}
            />

            <EXP_ExpenseFilterView
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
            />

            <ConfirmDialog
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Expense"
                description="Are you sure you want to delete this expense? This action cannot be undone."
                variant="destructive"
                confirmText="Delete"
            />

        </div>
    )
}

export default EXP_ExpenseListPage;
