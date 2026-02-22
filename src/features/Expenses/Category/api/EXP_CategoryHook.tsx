import { useQuery } from "@tanstack/react-query";
import { EXP_ExpenseQueries } from "./EXP_CategoryQuery";

export function useEXP_CategorySelectComboBox(enable: boolean) {
  return useQuery({ ...EXP_ExpenseQueries.SelectComboBox(), enabled: enable });
}