export type SortDirection = 'asc' | 'desc' | null | undefined;
export interface SortItem {
  /**
   * The column field identifier.
   */
  field: string;
  /**
   * The direction of the column that the grid should sort.
   */
  sort: SortDirection;
}
export type SortModel = readonly SortItem[];