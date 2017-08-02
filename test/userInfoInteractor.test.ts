import * as Interactor from "../src/backend/interactors";
import * as Dto from "../src/backend/dtos";
import * as Interface from "../src/backend/interfaces";
import * as Entity from "../src/backend/entities";

// For test purposes
class MockUserRepository implements Interface.UserRepository {
  private static _user = new Entity.User("a", "b", "12-02-1993", "Hello", ["a", "b"]);
  public static ERROR_MESSAGE: string = "Inexsting user";

  public getUser(): Entity.User {
    return MockUserRepository._user;
  }
}


const interactor = new Interactor.RequestUserInfoInteractor(new MockUserRepository());

describe("Request an existing user", () => {
  const request = new Dto.UserInfoRequestMessage();
  const response = interactor.handle(request);

  it("should be succesful", () => {
    expect(response.success).toBeTruthy();
  });
  it("should not return an error message", () => {
    expect(response.message).toBeFalsy();
  });
  it("should return a user", () => {
    expect(response.user).toBeInstanceOf(Entity.User);
  });
});