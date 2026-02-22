import { LabelText, SectionBox, type DataModalButtons, type DataModalComponentProps } from "@/components/shared";
import dayjs from "dayjs";
import { forwardRef } from "react";
import type { EXP_ExpenseSelectViewResponse } from "../types";


export const EXP_ExpenseDetailView = forwardRef<DataModalButtons, DataModalComponentProps<EXP_ExpenseSelectViewResponse>>(({ data }, _ref) => {
    return (
        <>
            <SectionBox title="Expense Details">
                <LabelText
                    label="Title"
                    value={data?.Title}
                />
                <LabelText
                    label="Amount"
                    value={`${data?.Amount?.toFixed(2)} ${data?.Currency}`}
                />
                <LabelText
                    label="Category"
                    value={data?.CategoryName}
                />
                <LabelText
                    label="Status"
                    value={data?.ExpenseStatus}
                />
            </SectionBox>

            <SectionBox title="Audit Fields" variant="info">
                <LabelText
                    label="Created On"
                    value={data?.Created ? dayjs(data.Created).format("YYYY-MM-DD HH:mm") : "-"}
                />
                <LabelText
                    label="Created By"
                    value={data?.CreatedByUserDisplayName}
                />
            </SectionBox>
        </>
    );
});