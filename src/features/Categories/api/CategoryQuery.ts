import { api } from "@/api/client";
import type { OptionsResponse, PostModel } from "@/api/types";
import type { EntityId } from "@/hooks/userListView";
import { createQueryKeys } from '@lukemorales/query-key-factory';
import type { CategoryAddEditRequest, CategorySelectPageRequest, CategorySelectPageResponse, CategorySelectViewResponse } from "../types";
import { CategoryEndpoints } from "./CategoryEndpoints";

export const CategoryQueries = createQueryKeys('Category', {
  SelectPage: (postModel: PostModel<CategorySelectPageRequest>) => ({
    queryKey: [postModel],
    queryFn: () =>
      api.filter<CategorySelectPageResponse, CategorySelectPageRequest>(
        CategoryEndpoints.SelectPage,
        postModel
      ),
  }),

  SelectPK: (categoryId: EntityId) => ({
    queryKey: [categoryId],
    queryFn: () =>
      api.get<CategoryAddEditRequest>(CategoryEndpoints.SelectPk(categoryId)),
  }),

  SelectView: (categoryId: EntityId) => ({
    queryKey: [categoryId],
    queryFn: () =>
      api.get<CategorySelectViewResponse>(CategoryEndpoints.SelectView(categoryId)),
  }),

  SelectComboBox: () => ({
    queryKey: ['SelectComboBox'],
    queryFn: () => api.get<OptionsResponse[]>(CategoryEndpoints.SelectComboBox!),
  }),
});
