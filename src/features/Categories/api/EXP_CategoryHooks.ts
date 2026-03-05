import type { PostModel } from "@/api/types";
import type { EntityId } from "@/hooks/userListView";
import { useQuery } from "@tanstack/react-query";
import type { EXP_CategorySelectPageRequest } from "../types";
import { EXP_CategoryQueries } from "./EXP_CategoryQuery";

export const useSelectPageQuery = (
  postModel: PostModel<EXP_CategorySelectPageRequest>,
  enabled: boolean = true
) => {
  const query = useQuery({
    ...EXP_CategoryQueries.SelectPage(postModel),
    enabled,
  });

  return {
    data: query.data?.Data || [],
    totalRecords: query.data?.Total || 0,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};

export const useSelectPKQuery = (categoryId: EntityId, enabled: boolean = true) => {
  return useQuery({
    ...EXP_CategoryQueries.SelectPK(categoryId),
    enabled: enabled && !!categoryId,
  });
};

export const useSelectViewQuery = (categoryId: EntityId, enabled: boolean = true) => {
  return useQuery({
    ...EXP_CategoryQueries.SelectView(categoryId),
    enabled: enabled && !!categoryId,
  });
};

export const useSelectComboBox = () => {
  return useQuery({
    ...EXP_CategoryQueries.SelectComboBox(),
  });
};