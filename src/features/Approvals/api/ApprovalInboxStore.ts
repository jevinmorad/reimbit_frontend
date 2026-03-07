import type { PostModel } from "@/api/types";
import { CONFIG } from "@/global-config";
import type { PaginationModel, SortModel } from "@/types/api";
import { calculateFilterCount } from "@/utils/calculateFilterCounts";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ApprovalInboxListRequest } from "../types/ApprovalInboxTypes";

type State = {
    filterCount: number;
    postModel: PostModel<ApprovalInboxListRequest>;
};

type Action = {
    handleFiltering: (filterModel: ApprovalInboxListRequest) => void;
    handlePagination: (pageModel: PaginationModel) => void;
    handleSorting: (sortModel: SortModel) => void;
};

export const useApprovalInboxStore = create<State & Action>()(
    persist(
        set => ({
            postModel: {
                pageOffset: 0,
                pageSize: CONFIG.DefaultPageSize,
                sortField: null,
                sortOrder: null,
                filterModel: { status: 1 } // Default to Submitted
            },
            filterCount: 0,
            handleFiltering: (filterModel: ApprovalInboxListRequest) =>
                set(state => ({
                    filterCount: filterModel ? calculateFilterCount(filterModel) : 0,
                    postModel: { ...state.postModel, filterModel: { ...filterModel } },
                })),
            handlePagination: (pageModel: PaginationModel) =>
                set(state => ({
                    postModel: {
                        ...state.postModel,
                        pageOffset: pageModel.pageOffset,
                        pageSize: pageModel.pageSize,
                    },
                })),
            handleSorting: (sortModel: SortModel) =>
                set(state => ({
                    postModel: {
                        ...state.postModel,
                        sortField: sortModel.length > 0 ? sortModel[0].field : null,
                        sortOrder: sortModel.length > 0 ? (sortModel[0].sort as 'asc' | 'desc' | null) : null,
                    },
                })),
        }),
        {
            name: "ApprovalInbox",
            partialize: state => ({
                postModel: state.postModel,
                filterCount: state.filterCount,
            }),
        }
    )
);
