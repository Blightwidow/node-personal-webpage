import * as Interface from "../interfaces";

export class UserInfoRequestMessage implements Interface.Request {
  readonly userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }
}
