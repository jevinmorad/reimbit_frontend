import { DashboardContent } from "@/components/dashboard-content"
import { GlobalConfirmDialog } from "@/components/global-confirm-dialog"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { useApiErrorHandler } from "@/features/auth/hooks/useApiErrorHandler"
import useListView, { type EntityId } from "@/hooks/userListView"
import { type ColumnDef } from "@tanstack/react-table"
import { Edit, Eye, Trash2 } from "lucide-react"
import React, { useMemo } from "react"
import { useSelectPageQuery } from "../api/CAT_CategoryHooks"
import { useDeleteCAT_Category } from "../api/CAT_CategoryMutation"
import { useCAT_CategoryStore } from "../api/CAT_CategoryStore"
import type { CAT_CategorySelectPageResponse } from "../types"
import { CAT_CategoryFilterView } from "../view"
import CAT_CategoryAddEditPage from "./CAT_CategoryAddEditPage"
import CAT_CategoryViewPage from "./CAT_CategoryViewPage"

const CAT_CategoryListPage = () => {
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

    const { postModel, handlePagination, handleSorting } = useCAT_CategoryStore()

    const { handleSuccess, handleError } = useApiErrorHandler({
        namespace: "Expense Category",
        showToast: true,
    })

    const { data, totalRecords, isLoading } = useSelectPageQuery(postModel, true)

    const deleteMutation = useDeleteCAT_Category(handleSuccess, handleError)

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
                },
                onSettled: () => {
                    setConfirmOpen(false)
                    setDeleteId(null)
                }
            })
        }
    }

    const columns = useMemo<ColumnDef<CAT_CategorySelectPageResponse>[]>(() => [
        {
            accessorKey: "CategoryName",
            header: "Category Name",
            cell: ({ row }) => (
                <span
                    className="cursor-pointer text-primary hover:underline font-medium"
                    onClick={() => showDetailView(row.original.CategoryId)}
                >
                    {row.getValue("CategoryName")}
                </span>
            )
        },
        {
            accessorKey: "Description",
            header: "Description",
            cell: ({ row }) => (
                <span className="text-muted-foreground truncate max-w-[300px] inline-block">
                    {row.getValue("Description") || "-"}
                </span>
            )
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
                        onClick={() => showDetailView(row.original.CategoryId)}
                        title="View"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary"
                        onClick={() => showEditView(row.original.CategoryId)}
                        title="Edit"
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDelete(row.original.CategoryId)}
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

            <CAT_CategoryAddEditPage
                showModal={formView}
                selectedRow={selectedRowId}
                onClose={closeAddEditView}
            />

            <CAT_CategoryViewPage
                showModal={detailView}
                selectedRow={selectedRowId}
                onClose={closeDetailView}
            />

            <CAT_CategoryFilterView
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
            />

            <GlobalConfirmDialog
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Category"
                description="Are you sure you want to delete this category? This action cannot be undone."
                variant="destructive"
                confirmText="Delete"
            />
        </DashboardContent>
    )
}

export default CAT_CategoryListPage;
