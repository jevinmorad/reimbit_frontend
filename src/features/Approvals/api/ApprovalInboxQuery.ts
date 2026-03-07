import { api } from "@/api/client";
import type { PostModel } from "@/types/api";
import { createQueryKeys } from '@lukemorales/query-key-factory';
import type { ApprovalInboxListRequest, ApprovalInboxListResponse } from "../types/ApprovalInboxTypes";
import { ApprovalInboxEndpoints } from "./ApprovalInboxEndpoints";

export const ApprovalInboxQueries = createQueryKeys('ApprovalInbox', {
    list: (postModel: PostModel<ApprovalInboxListRequest>) => ({
        queryKey: [postModel],
        queryFn: () =>
            api.filter<ApprovalInboxListResponse, ApprovalInboxListRequest>(
                ApprovalInboxEndpoints.ApprovalInbox,
                postModel
            ),
    }),
});
