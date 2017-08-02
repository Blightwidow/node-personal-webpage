import * as Interface from "../interfaces";
import * as Entity from "../entities";

export class UserInfoResponseMessage extends Interface.Response {
  constructor(readonly user: Entity.User, sucess: boolean, message: string) {
    super(sucess, message);
  }
}
