import { LabelText, SectionBox, type DataModalButtons, type DataModalComponentProps } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useApiErrorHandler } from "@/features/auth/hooks/useApiErrorHandler";
import { formatDate } from "@/lib/utils";
import { ExpenseStatus } from "@/types/constant";
import { CheckCircle, XCircle } from "lucide-react";
import { forwardRef, useState } from "react";
import { useUpdateExpenseStatus } from "../api/ApprovalInboxMutation";
import type { ApprovalInboxListResponse } from "../types/ApprovalInboxTypes";

export const ApprovalInboxDetailView = forwardRef<DataModalButtons, DataModalComponentProps<ApprovalInboxListResponse>>(({ data, onClose }, _ref) => {
    const [rejectionReason, setRejectionReason] = useState("");
    const [showRejection, setShowRejection] = useState(false);

    const { handleSuccess, handleError } = useApiErrorHandler({
        namespace: "Approval",
        onSuccess: {
            update: () => onClose?.(),
        },
    });

    const updateStatusMutation = useUpdateExpenseStatus(handleSuccess, handleError);

    const handleAccept = async () => {
        if (!data?.ExpenseId) return;
        await updateStatusMutation.mutateAsync({
            expenseId: data.ExpenseId,
            status: ExpenseStatus.UnderApproval,
        });
    };

    const handleReject = async () => {
        if (!showRejection) {
            setShowRejection(true);
            return;
        }
        if (!data?.ExpenseId || !rejectionReason.trim()) return;

        await updateStatusMutation.mutateAsync({
            expenseId: data.ExpenseId,
            status: ExpenseStatus.Rejected,
            reason: rejectionReason,
        });
    };

    return (
        <div className="space-y-6">
            <SectionBox title="Expense Details">
                <LabelText
                    label="Employee"
                    value={data?.EmployeeName}
                    gridProps={{ size: { xs: 12, md: 6, lg: 6 } }}
                />
                <LabelText
                    label="Title"
                    value={data?.Title}
                    gridProps={{ size: { xs: 12, md: 6, lg: 6 } }}
                />
                <LabelText
                    label="Amount"
                    value={`${data?.Amount?.toFixed(2) || ''} ${data?.Currency || ''}`}
                    gridProps={{ size: { xs: 12, md: 6, lg: 6 } }}
                />
                <LabelText
                    label="Category"
                    value={data?.CategoryName}
                    gridProps={{ size: { xs: 12, md: 6, lg: 6 } }}
                />
            </SectionBox>

            {data?.ReceiptUrl && (
                <SectionBox title="Attachments">
                    <div className="col-span-12">
                        <LabelText
                            label="File Link"
                            value={
                                <a
                                    href={data.ReceiptUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline flex items-center gap-1"
                                >
                                    View Attachment
                                </a>
                            }
                        />
                        <div className="mt-2 relative group rounded-xl overflow-hidden border border-muted-foreground/10 bg-muted/5">
                            <img
                                src={data.ReceiptUrl}
                                alt="Receipt"
                                className="w-full h-auto max-h-48 object-contain rounded-xl"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </SectionBox>
            )}

            <SectionBox title="General Information" variant="info">
                <LabelText
                    label="Submitted On"
                    value={formatDate(data?.Created)}
                    gridProps={{ size: { xs: 12, md: 12, lg: 12 } }}
                />
            </SectionBox>

            {!updateStatusMutation.isPending && (
                <div className="mt-6 flex flex-col gap-4">
                    {showRejection && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Rejection Reason <span className="text-destructive">*</span></label>
                            <Textarea
                                placeholder="Enter reason for rejection..."
                                value={rejectionReason}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRejectionReason(e.target.value)}
                                className="resize-none"
                                rows={3}
                            />
                        </div>
                    )}
                    <div className="flex gap-4 justify-end">
                        {!showRejection && (
                            <Button
                                type="button"
                                variant="outline"
                                className="border-green-500 text-green-600 hover:bg-green-50"
                                onClick={handleAccept}
                            >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Accept
                            </Button>
                        )}
                        <Button
                            type="button"
                            variant={showRejection ? "destructive" : "outline"}
                            className={!showRejection ? "border-red-500 text-red-600 hover:bg-red-50" : ""}
                            onClick={handleReject}
                            disabled={showRejection && !rejectionReason.trim()}
                        >
                            <XCircle className="mr-2 h-4 w-4" />
                            {showRejection ? "Confirm Reject" : "Reject"}
                        </Button>
                        {showRejection && (
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => {
                                    setShowRejection(false);
                                    setRejectionReason("");
                                }}
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
});
