export class BaseResultError {
  status_code: string;
  error_message: string;
  error: string;

  constructor(status_code: string, error_message: string, error: string) {
    this.status_code = status_code;
    this.error_message = error_message;
    this.error = error;
  }
}
