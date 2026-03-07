import type { PostModel } from "@/api/types";
import type { EntityId } from "@/hooks/userListView";
import { useQuery } from "@tanstack/react-query";
import type { CategorySelectPageRequest } from "../types";
import { CategoryQueries } from "./CategoryQuery";

export const useSelectPageQuery = (
  postModel: PostModel<CategorySelectPageRequest>,
  enabled: boolean = true
) => {
  const query = useQuery({
    ...CategoryQueries.SelectPage(postModel),
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
    ...CategoryQueries.SelectPK(categoryId),
    enabled: enabled && !!categoryId,
  });
};

export const useSelectViewQuery = (categoryId: EntityId, enabled: boolean = true) => {
  return useQuery({
    ...CategoryQueries.SelectView(categoryId),
    enabled: enabled && !!categoryId,
  });
};

export const useSelectComboBox = () => {
  return useQuery({
    ...CategoryQueries.SelectComboBox(),
  });
};