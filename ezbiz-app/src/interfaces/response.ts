export type Response<T> = {
  status: number;
  message: string;
  data: T;
  // error?: string;
  isError: boolean;
};
