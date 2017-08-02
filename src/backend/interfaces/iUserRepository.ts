import * as Entity from "../entities";

export interface UserRepository {
  getUser(): Entity.User;
}
