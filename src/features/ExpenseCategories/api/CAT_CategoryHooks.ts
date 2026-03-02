import type { PostModel } from "@/api/types";
import type { EntityId } from "@/hooks/userListView";
import { useQuery } from "@tanstack/react-query";
import type { CAT_CategorySelectPageRequest } from "../types";
import { CAT_CategoryQueries } from "./CAT_CategoryQuery";

export const useSelectPageQuery = (
  postModel: PostModel<CAT_CategorySelectPageRequest>,
  enabled: boolean = true
) => {
  const query = useQuery({
    ...CAT_CategoryQueries.SelectPage(postModel),
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
    ...CAT_CategoryQueries.SelectPK(categoryId),
    enabled: enabled && !!categoryId,
  });
};

export const useSelectViewQuery = (categoryId: EntityId, enabled: boolean = true) => {
  return useQuery({
    ...CAT_CategoryQueries.SelectView(categoryId),
    enabled: enabled && !!categoryId,
  });
};

export const useSelectComboBox = () => {
  return useQuery({
    ...CAT_CategoryQueries.SelectComboBox(),
  });
};