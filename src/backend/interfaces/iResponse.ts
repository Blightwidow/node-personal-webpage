export abstract class Response {
  readonly success: boolean;
  readonly message: string;

  constructor(sucess: boolean, message: string) {
    this.success = sucess;
    this.message = message;
  }
}
