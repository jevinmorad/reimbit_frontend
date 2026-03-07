import { LabelText, SectionBox, type DataModalButtons, type DataModalComponentProps } from "@/components/shared";
import { formatDate } from "@/lib/utils";
import { forwardRef } from "react";
import type { EXP_ExpenseSelectViewResponse } from "../types";


export const EXP_ExpenseDetailView = forwardRef<DataModalButtons, DataModalComponentProps<EXP_ExpenseSelectViewResponse>>(({ data }, _ref) => {
    return (
        <div className="space-y-6">
            <SectionBox title="Expense Details">
                <LabelText
                    label="Title"
                    value={data?.Title}
                    gridProps={{ size: { xs: 12, md: 6, lg: 6 } }}
                />
                <LabelText
                    label="Amount"
                    value={`${data?.Amount?.toFixed(2)} ${data?.Currency}`}
                    gridProps={{ size: { xs: 12, md: 6, lg: 6 } }}
                />
                <LabelText
                    label="Category"
                    value={data?.CategoryName}
                    gridProps={{ size: { xs: 12, md: 6, lg: 6 } }}
                />
                <LabelText
                    label="Status"
                    value={data?.ExpenseStatus}
                    gridProps={{ size: { xs: 12, md: 6, lg: 6 } }}
                />
                <LabelText
                    label="Employee"
                    value={data?.UserDisplayName}
                    gridProps={{ size: { xs: 12, md: 6, lg: 6 } }}
                />
                <LabelText
                    label="Description"
                    value={data?.Description ?? '-'}
                    gridProps={{ size: { xs: 12 } }}
                />

                <LabelText
                    label="Rejection Reason"
                    value={data?.RejectionReason ?? '-'}
                    gridProps={{ size: { xs: 12 } }}
                    className="text-destructive"
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
                    </div>
                </SectionBox>
            )}

            <SectionBox title="General Information" variant="info">
                <LabelText
                    label="Created On"
                    value={formatDate(data?.Created)}
                    gridProps={{ size: { xs: 12, md: 6, lg: 6 } }}
                />
                <LabelText
                    label="Created By"
                    value={data?.CreatedByUserDisplayName}
                    gridProps={{ size: { xs: 12, md: 6, lg: 6 } }}
                />
                <LabelText
                    label="Modified On"
                    value={formatDate(data?.Modified)}
                    gridProps={{ size: { xs: 12, md: 6, lg: 6 } }}
                />
                <LabelText
                    label="Modified By"
                    value={data?.ModifiedByUserDisplayName}
                    gridProps={{ size: { xs: 12, md: 6, lg: 6 } }}
                />
            </SectionBox>
        </div>
    );
});