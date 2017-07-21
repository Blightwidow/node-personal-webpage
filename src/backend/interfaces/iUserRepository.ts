import * as Entity from "../entities";

export interface UserRepository {
  getByName(name: string): Entity.User;
  getAll(): Array<Entity.User>;
}
