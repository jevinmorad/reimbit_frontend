import { api } from "@/api/client";
import type { OptionsResponse, PostModel } from "@/api/types";
import type { EntityId } from "@/hooks/userListView";
import { createQueryKeys } from '@lukemorales/query-key-factory';
import type { EXP_CategoryAddEditRequest, EXP_CategorySelectPageRequest, EXP_CategorySelectPageResponse, EXP_CategorySelectViewResponse } from "../types";
import { EXP_CategoryEndpoints } from "./EXP_CategoryEndpoints";

export const EXP_CategoryQueries = createQueryKeys('EXP_Category', {
  SelectPage: (postModel: PostModel<EXP_CategorySelectPageRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      api.filter<EXP_CategorySelectPageResponse, EXP_CategorySelectPageRequest>(
        EXP_CategoryEndpoints.SelectPage,
        postModel
      ),
  }),

  SelectPK: (categoryId: EntityId) => ({
    queryKey: [categoryId],
    queryFn: () =>
      api.get<EXP_CategoryAddEditRequest>(EXP_CategoryEndpoints.SelectPk(categoryId)),
  }),

  SelectView: (categoryId: EntityId) => ({
    queryKey: [categoryId],
    queryFn: () =>
      api.get<EXP_CategorySelectViewResponse>(EXP_CategoryEndpoints.SelectView(categoryId)),
  }),

  SelectComboBox: () => ({
    queryKey: ['SelectComboBox'],
    queryFn: () => api.get<OptionsResponse[]>(EXP_CategoryEndpoints.SelectComboBox!),
  }),
});
