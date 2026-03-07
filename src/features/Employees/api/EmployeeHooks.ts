import type { EntityId } from "@/hooks/userListView";
import type { PostModel } from "@/types/api";
import { useStableRowCount } from "@/utils/useStableRowCount";
import { useQuery } from "@tanstack/react-query";
import { EmployeeQueries } from "./EmployeeQuery";

export function useEmployeeSelectPageQuery(
    model: PostModel,
    enabled: boolean
) {
    const { data, isLoading, error } = useQuery({
        ...EmployeeQueries.selectPage(model),
        enabled,
    });

    const rowCount = useStableRowCount(data?.Total);

    return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount };
}

export function useEmployeeSelectViewQuery(userId: EntityId | null | undefined, enabled: boolean) {
    return useQuery({
        ...EmployeeQueries.selectView(userId!),
        enabled: !!userId && enabled,
    });
}
