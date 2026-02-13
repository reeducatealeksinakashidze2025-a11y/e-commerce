export class  PagedResult<T> {
  items: T;
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
   constructor(page = 1, pageSize = 5) {
    this.items = [] as unknown as T;
    this.page = page;
    this.pageSize = pageSize;
    this.totalCount = 0;
    this.totalPages = 0;
  }
}
