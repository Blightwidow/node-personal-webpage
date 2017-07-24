import { RequestUserInfoInteractor } from "../src/backend/interactors";
import { UserInfoRequestMessage, UserInfoResponseMessage } from "../src/backend/dtos";
import { UserRepository } from "../src/backend/interfaces";
import { User } from "../src/backend/entities";

// For test purposes
class MockUserRepository implements UserRepository {
  private static _user = new User(0, "a", "b", "12-02-1993", [], []);
  public static ERROR_MESSAGE: string = "Inexsting user";

  public getById(id: number): User {
    if (id !== 0) {
      throw new Error(MockUserRepository.ERROR_MESSAGE);
    }

    return MockUserRepository._user;
  }

  public getAll(): Array<User> {
    return [ MockUserRepository._user ];
  }
}


const interactor = new RequestUserInfoInteractor(new MockUserRepository());

describe("Request an existing user", () => {
  let request = new UserInfoRequestMessage(0);
  let response = interactor.handle(request);

  it("should be succesful", () => {
    expect(response.success).toBeTruthy();
  });
  it("should not return an error message", () => {
    expect(response.message).toBeFalsy();
  });
  it("should return a user", () => {
    expect(response.user).toBeInstanceOf(User);
  });
});

describe("Request an nonexisting user", () => {
  let request = new UserInfoRequestMessage(-1);
  let response = interactor.handle(request);

  it("should not be succesful", () => {
    expect(response.success).toBeFalsy();
  });
  it("should return an error message", () => {
    expect(response.message).toBeTruthy();
  });
  it("should not return a user", () => {
    expect(response.user).toBe(null);
  });
});
