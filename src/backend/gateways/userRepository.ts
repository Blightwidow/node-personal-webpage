import * as Interface from "../interfaces";
import * as Entity from "../entities";

export class CourseRepository implements Interface.UserRepository {
  private readonly store: Array<Entity.User> = [];

  public getByName(name: string): Entity.User {
    return this.store[0];
  }

  public getAll(): Array<Entity.User> {
    return this.store;
  }
}
