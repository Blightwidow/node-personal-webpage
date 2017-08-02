import { UserRepository } from "../src/backend/gateways";

const repository = new UserRepository();

describe("Request an existing user", () => {
  const response = repository.getUser();
  it("should return a user", () => {
    expect(response).toBeTruthy();
  });
});