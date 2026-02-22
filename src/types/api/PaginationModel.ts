export interface PaginationModel {
  /**
   * Set the number of rows in one page.
   * If some of the rows have children (for instance in the tree data), this number represents the amount of top level rows wanted on each page.
   * @default 10
   */
  pageSize: number;
  /**
   * The zero-based index of the current page.
   * @default 0
   */
  pageOffset: number;
}
export interface PaginationMeta {
  hasNextPage?: boolean;
}