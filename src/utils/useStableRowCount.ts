import { useMemo, useRef } from "react";

export function useStableRowCount(currentTotal: number | undefined): number {
  const rowCountRef = useRef(currentTotal || 0);

  const stableRowCount = useMemo(() => {
    if (currentTotal !== undefined) {
      rowCountRef.current = currentTotal;
    }
    return rowCountRef.current;
  }, [currentTotal]);

  return stableRowCount;
}