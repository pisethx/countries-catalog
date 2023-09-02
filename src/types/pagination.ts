export enum SortDirection {
  ASCENDING = 'ASC',
  DESCENDING = 'DESC'
}

export interface Pagination {
  search: string
  page: number
  sort: SortDirection
}
