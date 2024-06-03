export type ApiResponse<Data> = {
  success: boolean;
  message: string;
  data: Data;
}
