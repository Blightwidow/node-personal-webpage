import { UserRepository } from "../src/backend/gateways";

const repository = new UserRepository();

describe("Request an existing user", () => {
  let response = null;
  let error = null;

  try {
    response = repository.getById(0);
  } catch (e) {
    error = e;
  }
  it("should return a user", () => {
    expect(response).toBeTruthy();
  });
  it("should not trow an error", () => {
    expect(error).toBeFalsy();
  });
});

describe("Request an nonexisting user", () => {
  let response = null;
  let error = null;

  try {
    response = repository.getById(-1);
  } catch (e) {
    error = e;
  }
  it("should not return a user", () => {
    expect(response).toBeFalsy();
  });
  it("should trow an error", () => {
    expect(error).toBeTruthy();
  });
});

describe("Request all users", () => {
  let response = null;
  let error = null;

  try {
    response = repository.getAll();
  } catch (e) {
    error = e;
  }
  it("should not return a list of user", () => {
    expect(response.length).toBeGreaterThan(0);
  });
});
