import { CONFIG } from "@/global-config";
import { PostModel } from "@/types/api";
import { PaginationModel } from "@/types/api/PaginationProps";
import { SortModel } from "@/types/api/SortModel";
import { calculateFilterCount } from "@/utils/calculateFilterCounts";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EXP_ExpenseSelectPageRequest } from "../types";

type State = {
  filterCount: number;
  postModel: PostModel<EXP_ExpenseSelectPageRequest>;
};

type Action = {
  handleFiltering: (filterModel: EXP_ExpenseSelectPageRequest) => void;
  handlePagination: (pageModel: PaginationModel) => void;
  handleSorting: (sortModel: SortModel) => void;
};

export const useEXP_ExpenseStore = create<State & Action>()(
  persist(
    set => ({
      postModel: {
        pageOffset: 0,
        pageSize: CONFIG.DefaultPageSize,
        sortField: null,
        sortOrder: null,
      },
      filterCount: 0,
      handleFiltering: (filterModel: EXP_ExpenseSelectPageRequest) =>
        set(state => ({
          filterCount: filterModel ? calculateFilterCount(filterModel) : 0,
          postModel: { ...state.postModel, filterModel: { ...filterModel } },
        })),
      handlePagination: (pageModel: PaginationModel) =>
        set(state => ({
          postModel: {
            ...state.postModel,
            pageOffset: pageModel.page,
            pageSize: pageModel.pageSize,
          },
        })),
      handleSorting: (sortModel: SortModel) =>
        set(state => ({
          postModel: {
            ...state.postModel,
            sortField: sortModel.length > 0 ? sortModel[0].field : null,
            sortOrder: sortModel.length > 0 ? (sortModel[0].sort as 'asc' | 'desc' | null) : null,
            sortModel: sortModel.length > 0 ? sortModel : [],
          },
        })),
    }),
    {
      name: "EXP_Expense",
      partialize: state => ({
        postModel: state.postModel,
        filterCount: state.filterCount,
      }),
    }
  )
);
