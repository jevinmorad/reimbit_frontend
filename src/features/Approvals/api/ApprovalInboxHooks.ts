import type { PostModel } from "@/types/api";
import { useStableRowCount } from "@/utils/useStableRowCount";
import { useQuery } from "@tanstack/react-query";
import type { ApprovalInboxListRequest } from "../types/ApprovalInboxTypes";
import { ApprovalInboxQueries } from "./ApprovalInboxQuery";

export function useApprovalInboxListQuery(
    model: PostModel<ApprovalInboxListRequest>,
    enabled: boolean
) {
    const { data, isLoading, error } = useQuery({
        ...ApprovalInboxQueries.list(model),
        enabled,
    });

    const rowCount = useStableRowCount(data?.Total);

    return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount };
}
