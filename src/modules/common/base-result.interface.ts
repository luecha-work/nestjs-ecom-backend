export class BaseResultData {
  status_code: string;
  result: {};
  JWT_Token: string;
  messes: string;

  constructor(
    status_code: string,
    data: any[],
    JWT_Token: string,
    messes: string,
  ) {
    this.status_code = status_code;
    this.result = data;
    this.JWT_Token = JWT_Token;
    this.messes = messes;
  }
}
