export enum SortDirection {
  DEFAULT = 'DEFAULT',
  ASCENDING = 'ASC',
  DESCENDING = 'DESC'
}

export interface Pagination {
  search: string
  page: number
  sort: SortDirection
}
