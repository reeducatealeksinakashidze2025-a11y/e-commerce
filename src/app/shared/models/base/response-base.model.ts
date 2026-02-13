export class ResponseBase<T = any> {
  success!: boolean;
  message!: string;
  value!: T | null;
  error!: any;

  constructor(init?: Partial<ResponseBase<T>>) {
    Object.assign(this, init);
  }

  static success<T>(value: T, message: string = "Success"): ResponseBase<T> {
    return new ResponseBase<T>({
      success: true,
      message,
      value,
      error: null
    });
  }

  static fail(message: string = "Error", error: any = null): ResponseBase<null> {
    return new ResponseBase<null>({
      success: false,
      message,
      value: null,
      error
    });
  }

  /** Optional runtime validation */
  static isValidResponse(obj: any): obj is ResponseBase<any> {
    return (
      obj &&
      typeof obj.success === "boolean" &&
      typeof obj.message === "string" &&
      ("value" in obj) &&
      ("error" in obj)
    );
  }
}
