/**
 * create by fky
 * create on 2019/7/13
 */
export class PageList<T> {
  // The number of elements in the page
  total: number = 0;

  list?: Array<T>;
  //  current page number
  pageNum: number = 0;

  // page size
  pageSize: number = 0;
}
