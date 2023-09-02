export enum SortDirection {
  DEFAULT = 'DEFAULT',
  ASCENDING = 'ASC',
  DESCENDING = 'DESC'
}

export interface Pagination {
  page: number
  search: string
  sort: SortDirection
  rowsPerPage?: number
}
