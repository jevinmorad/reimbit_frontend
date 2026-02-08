import { withDataModal } from "@/components/shared/DataModal";
import { LabelText } from "@/components/shared/LabelText";
import { SectionBox } from "@/components/shared/SectionBox";
import dayjs from "dayjs";
import { EXP_ExpenseSelectViewResponse } from "../types/EXP_ExpenseSelectViewTypes";

export const EXP_ExpenseDetailView = withDataModal<EXP_ExpenseSelectViewResponse>(
    ({ data }) => {
        return (
            <>
                <SectionBox title="Expense Details">
                    <LabelText
                        label="Title"
                        value={data?.title}
                    />
                    <LabelText
                        label="Amount"
                        value={`${data?.amount?.toFixed(2)} ${data?.currency}`}
                    />
                    <LabelText
                        label="Category"
                        value={data?.categoryName}
                    />
                    <LabelText
                        label="Status"
                        value={data?.expenseStatus}
                    />
                </SectionBox>

                <SectionBox title="Audit Fields" variant="info">
                    <LabelText
                        label="Created On"
                        value={data?.created ? dayjs(data.created).format("YYYY-MM-DD HH:mm") : "-"}
                    />
                    <LabelText
                        label="Created By"
                        value={data?.createdByUserDisplayName}
                    />
                </SectionBox>
            </>
        );
    }
);