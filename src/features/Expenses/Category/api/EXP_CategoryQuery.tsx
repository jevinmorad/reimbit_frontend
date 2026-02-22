import { api } from "@/api/client";
import type { OptionsResponse } from "@/api/types";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { EXP_CategoryEndpoints } from "./EXP_CategoryEndpoints";

export const EXP_ExpenseQueries = createQueryKeys('EXP_Expense', {
    SelectComboBox: () => ({
        queryKey: ['SelectComboBox'],
        queryFn: () => api.get<OptionsResponse[]>(EXP_CategoryEndpoints.SelectComboBox!),
    }),
})