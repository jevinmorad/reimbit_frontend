import { EntityId } from "@/hooks/userListView";
import { PostModel } from "@/types/api";
import { useStableRowCount } from "@/utils/useStableRowCount";
import { useQuery } from "@tanstack/react-query";
import { EXP_ExpenseSelectPageRequest } from "../types";
import { EXP_ExpenseQueries } from "./EXP_ExpenseQuery";

export function useSelectPageQuery(
  model: PostModel<EXP_ExpenseSelectPageRequest>,
  enabled: boolean
) {
  const { data, isLoading, error } = useQuery({
    ...EXP_ExpenseQueries.selectPage(model),
    enabled,
  });

  const rowCount = useStableRowCount(data?.Total);

  return { data: data?.Data ?? [], isLoading, error, totalRecords: rowCount };
}

export function useSelectPKQuery(MSTIStandardID: EntityId | null | undefined, enabled: boolean) {
  return useQuery({
    ...EXP_ExpenseQueries.selectPK(MSTIStandardID!),
    enabled: !!MSTIStandardID && enabled,
  });
}

export function useSelectViewQuery(MSTIStandardID: EntityId | null | undefined, enabled: boolean) {
  return useQuery({
    ...EXP_ExpenseQueries.selectView(MSTIStandardID!),
    enabled: !!MSTIStandardID && enabled,
  });
}