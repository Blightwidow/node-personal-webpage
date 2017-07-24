import * as Entity from "../entities";

export interface UserRepository {
  getById(id: number): Entity.User;
  getAll(): Array<Entity.User>;
}
