export interface PaginateModel{
  data: [],
  links: {
    first: string,
    last: string,
    next: string,
    prev: string
  },
  meta: {
    current_page: number,
    from: number,
    last_page: number,
    links: {
      active: boolean,
      label: number,
      url: string
    },
    path: string,
    per_page: number,
    to: number,
    total: number
  }
}
