import type { EntityId } from "@/hooks/userListView";
import type { PostModel } from "@/types/api";
import { useStableRowCount } from "@/utils/useStableRowCount";
import { useQuery } from "@tanstack/react-query";
import { ExpenseSelectPageRequest } from "../types";
import { ExpenseQueries } from "./ExpenseQuery";

export function useSelectPageQuery(
  model: PostModel<ExpenseSelectPageRequest>,
  enabled: boolean
) {
  const { data, isLoading, error } = useQuery({
    ...ExpenseQueries.selectPage(model),
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount };
}

export function useSelectPKQuery(ExpenseId: EntityId | null | undefined, enabled: boolean) {
  return useQuery({
    ...ExpenseQueries.selectPK(ExpenseId!),
    enabled: !!ExpenseId && enabled,
  });
}

export function useSelectViewQuery(ExpenseId: EntityId | null | undefined, enabled: boolean) {
  return useQuery({
    ...ExpenseQueries.selectView(ExpenseId!),
    enabled: !!ExpenseId && enabled,
  });
}