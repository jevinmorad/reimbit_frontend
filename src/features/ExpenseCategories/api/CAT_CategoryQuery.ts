import { api } from "@/api/client";
import type { OptionsResponse, PostModel } from "@/api/types";
import type { EntityId } from "@/hooks/userListView";
import { createQueryKeys } from '@lukemorales/query-key-factory';
import type { CAT_CategoryAddEditRequest, CAT_CategorySelectPageRequest, CAT_CategorySelectPageResponse, CAT_CategorySelectViewResponse } from "../types";
import { CAT_CategoryEndpoints } from "./CAT_CategoryEndpoints";

export const CAT_CategoryQueries = createQueryKeys('CAT_Category', {
  SelectPage: (postModel: PostModel<CAT_CategorySelectPageRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      api.filter<CAT_CategorySelectPageResponse, CAT_CategorySelectPageRequest>(
        CAT_CategoryEndpoints.SelectPage,
        postModel
      ),
  }),

  SelectPK: (categoryId: EntityId) => ({
    queryKey: [categoryId],
    queryFn: () =>
      api.get<CAT_CategoryAddEditRequest>(CAT_CategoryEndpoints.SelectPk(categoryId)),
  }),

  SelectView: (categoryId: EntityId) => ({
    queryKey: [categoryId],
    queryFn: () =>
      api.get<CAT_CategorySelectViewResponse>(CAT_CategoryEndpoints.SelectView(categoryId)),
  }),

  SelectComboBox: () => ({
    queryKey: ['SelectComboBox'],
    queryFn: () => api.get<OptionsResponse[]>(CAT_CategoryEndpoints.SelectComboBox!),
  }),
});
