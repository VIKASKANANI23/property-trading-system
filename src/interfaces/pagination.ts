export interface PaginationInterface<T> {
  items: T;
  pagination: {
    total: number;
    recordPerPage: number;
    currentPage: number;
    totalPages: number;
    nextPage: number | null;
    remainingCount: number;
  };
}
