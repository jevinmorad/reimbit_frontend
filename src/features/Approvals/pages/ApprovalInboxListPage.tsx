import { DashboardContent } from "@/components/dashboard-content";
import { DataModal } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import useListView from "@/hooks/userListView";
import { formatCurrency, formatDate } from "@/lib/utils";
import { type ColumnDef } from "@tanstack/react-table";
import { FileCheck2 } from "lucide-react";
import { useMemo } from "react";
import { useApprovalInboxListQuery } from "../api/ApprovalInboxHooks";
import { useApprovalInboxStore } from "../api/ApprovalInboxStore";
import type { ApprovalInboxListResponse } from "../types/ApprovalInboxTypes";
import { ApprovalInboxDetailView } from "../view/ApprovalInboxDetailView";

const ApprovalInboxListPage = () => {
    const {
        modal: {
            detailView,
            showDetailView,
            closeDetailView
        },
        selectedRowId
    } = useListView();

    const { postModel, handlePagination, handleSorting } = useApprovalInboxStore();

    // Fetch the inbox list
    const { data, totalRecords, isLoading } = useApprovalInboxListQuery(postModel, true);

    const columns = useMemo<ColumnDef<ApprovalInboxListResponse>[]>(() => [
        {
            accessorKey: "Created",
            header: "Submitted",
            cell: ({ row }) => formatDate(row.original.Created)
        },
        {
            accessorKey: "EmployeeName",
            header: "Employee",
        },
        {
            accessorKey: "Title",
            header: "Title",
            cell: ({ row }) => (
                <span
                    className="cursor-pointer text-primary hover:underline font-medium"
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
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:bg-primary/10"
                        onClick={() => showDetailView(row.original.ExpenseId)}
                    >
                        <FileCheck2 className="h-4 w-4 mr-1.5" />
                        Review
                    </Button>
                </div>
            ),
        },
    ], [showDetailView]);

    const selectedExpense = data.find(item => item.ExpenseId === selectedRowId);

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
            />

            <DataModal
                Component={ApprovalInboxDetailView}
                data={selectedExpense}
                mode="view"
                handleClose={closeDetailView}
                modalTitle="Review Expense Approval"
                open={detailView}
                maxWidth="lg"
            />
        </DashboardContent>
    );
};

export default ApprovalInboxListPage;
