export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  balance: number;
  category: string | null;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}
export * from './budget';
