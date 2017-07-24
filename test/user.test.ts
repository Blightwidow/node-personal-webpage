import { User } from "../src/backend/entities";

describe("Build a simple user", () => {
  let user = null
  let error = null;

  try {
    user = new User(0, "theo", "dammaretz", "01-14-1993", [], ["hello"]);
  } catch (e) {
    error = e;
  }
  it("should have an id", () => {
    expect(user.firstName).toBe("theo");
  });
  it("should have a first name", () => {
    expect(user.firstName).toBe("theo");
  });
  it("should have a last name", () => {
    expect(user.lastName).toBe("dammaretz");
  });
  it("should have a date of birth", () => {
    expect(user.dateOfBirth.toDateString()).toBe("Thu Jan 14 1993");
  });
  it("should have a bio", () => {
    expect(user.biography).toEqual(["hello"]);
  });
});

describe("Build a faulty user", () => {
  let error = null;
  let user = null;
  try {
    user = new User(0, "theo", "dammaretz", "Thu!01!13!1993", [], []);
  } catch (e) {
    error = e;
  }
  it("should throw a SyntexError on incorrect date string", () => {
    expect(error).toBeInstanceOf(SyntaxError);
  });
});
