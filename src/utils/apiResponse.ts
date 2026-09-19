class ApiResponse<T> {
  public success: boolean;
  public statusCode: number;
  public message: string;
  public data: T | null;

  constructor(statusCode: number, message: string, data: T | null) {
    this.success = statusCode >= 200 && statusCode < 300;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }
}


export default ApiResponse;