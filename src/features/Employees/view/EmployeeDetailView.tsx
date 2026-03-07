import { LabelText, SectionBox, type DataModalButtons, type DataModalComponentProps } from "@/components/shared";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { forwardRef } from "react";
import type { EmployeeSelectViewResponse } from "../types";

export const EmployeeDetailView = forwardRef<DataModalButtons, DataModalComponentProps<EmployeeSelectViewResponse>>(({ data }, _ref) => {
    return (
        <div className="space-y-6">
            <SectionBox title="Employee Profile">
                <div className="col-span-12 flex items-center gap-4 mb-4">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold">
                        {data?.Name?.charAt(0) || "U"}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">{data?.Name}</h2>
                        <Badge variant="outline" className="mt-1">{data?.Role || 'No Role Assigned'}</Badge>
                    </div>
                </div>

                <LabelText
                    label="Manager"
                    value={data?.ManagerName}
                    gridProps={{ size: { xs: 12, md: 6, lg: 6 } }}
                />

                <LabelText
                    label="Total Expenses"
                    value={data?.TotalExpense ? `$${data.TotalExpense}` : "$0.00"}
                    gridProps={{ size: { xs: 12, md: 6, lg: 6 } }}
                />
            </SectionBox>

            <SectionBox title="System Information" variant="info">
                <LabelText
                    label="Created On"
                    value={formatDate(data?.Created)}
                    gridProps={{ size: { xs: 12, md: 6, lg: 6 } }}
                />
                <LabelText
                    label="Created By"
                    value={data?.CreatedByUserName}
                    gridProps={{ size: { xs: 12, md: 6, lg: 6 } }}
                />
                <LabelText
                    label="Modified On"
                    value={formatDate(data?.Modified)}
                    gridProps={{ size: { xs: 12, md: 6, lg: 6 } }}
                />
                <LabelText
                    label="Modified By"
                    value={data?.ModifiedByUserName}
                    gridProps={{ size: { xs: 12, md: 6, lg: 6 } }}
                />
            </SectionBox>
        </div>
    );
});