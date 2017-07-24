import * as Interface from "../interfaces";
import * as Entity from "../entities";

export class UserInfoResponseMessage extends Interface.Response {
  readonly user: Entity.User;

  constructor(user: Entity.User, sucess: boolean, message: string) {
    super(sucess, message);
    this.user = user;
  }
}
