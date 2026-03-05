import { LabelText, SectionBox, type DataModalButtons, type DataModalComponentProps } from "@/components/shared";
import { forwardRef } from "react";
import type { EXP_CategorySelectViewResponse } from "../types";

export const EXP_CategoryDetailView = forwardRef<DataModalButtons, DataModalComponentProps<EXP_CategorySelectViewResponse>>(({ data }, _ref) => {
    return (
        <div className="space-y-6">
            <SectionBox title="Category Information">
                <LabelText
                    label="Name"
                    value={data?.CategoryName}
                    gridProps={{ size: { xs: 12, md: 6 } }}
                />
                <LabelText
                    label="ID"
                    value={data?.CategoryId}
                    gridProps={{ size: { xs: 12, md: 6 } }}
                />
                <LabelText
                    label="Description"
                    value={data?.Description}
                    gridProps={{ size: { xs: 12 } }}
                    layout="vertical"
                />
            </SectionBox>
        </div>
    );
});
