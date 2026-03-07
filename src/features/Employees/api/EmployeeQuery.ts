import { api } from "@/api/client";
import type { EntityId } from "@/hooks/userListView";
import type { PostModel } from "@/types/api";
import { createQueryKeys } from '@lukemorales/query-key-factory';
import type { EmployeeSelectPageResponse, EmployeeSelectViewResponse } from "../types";
import { EmployeeEndpoints } from "./EmployeeEndpoints";

export const EmployeeQueries = createQueryKeys('Employee', {
    selectPage: (postModel: PostModel) => ({
        queryKey: [postModel],
        queryFn: () =>
            api.filter<EmployeeSelectPageResponse, unknown>(
                EmployeeEndpoints.List,
                postModel
            ),
    }),

    selectView: (userId: EntityId) => ({
        queryKey: [userId],
        queryFn: () =>
            api.get<EmployeeSelectViewResponse>(EmployeeEndpoints.SelectView(userId)),
    }),
});
