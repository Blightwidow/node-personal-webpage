import * as Interface from "../interfaces";
import * as Entity from "../entities";

export class UserRepository implements Interface.UserRepository {
  private readonly _store: Array<Entity.User> = [
    {
      id: 0,
      firstName: "theo",
      lastName: "dammaretz",
      dateOfBirth: new Date("01-14-1993"),
      contactInfos: [],
      biography: []
    }
  ];

  public getById(id: number): Entity.User {
    for (let i = 0; i < this._store.length; i++) {
      let user = this._store[i];
      if (user.id === id) {
        return user;
      }
    }
    throw new Error(`Nonexisting user from userID ${id}`);
  }

  public getAll(): Array<Entity.User> {
    return this._store;
  }
}
