export type SortDirection = 'asc' | 'desc' | null | undefined;

/**
 * Object that represents the column sorted data, part of the [[GridSortModel]].
 */
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
/**
 * The model used for sorting the grid.
 */
export type SortModel = readonly SortItem[];