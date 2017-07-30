import { ContactPoint } from "../src/backend/entities";

describe("Build a simple telephone contact point", () => {
  let error = null;
  let contact = null;

  try {
    contact = new ContactPoint(ContactPoint.Type.Phone, "000");
  } catch (e) {
    error = e;
  }
  it("should have a type", () => {
    expect(contact.type).toEqual(ContactPoint.Type.Phone);
  });
  it("should have an address", () => {
    expect(contact.address).toBe("000");
  });
});

describe("Build a simple email contact point", () => {
  let error = null;
  let contact = null;

  try {
    contact = new ContactPoint(ContactPoint.Type.Email, "theo@dammaretz.fr");
  } catch (e) {
    error = e;
  }
  it("should have a type", () => {
    expect(contact.type).toEqual(ContactPoint.Type.Email);
  });
  it("should have an address", () => {
    expect(contact.address).toBe("theo@dammaretz.fr");
  });
});

describe("Build a simple http contact point", () => {
  let error = null;
  let contact = null;

  try {
    contact = new ContactPoint(ContactPoint.Type.Website, "https://a.f");
  } catch (e) {
    error = e;
  }
  it("should have a type", () => {
    expect(contact.type).toEqual(ContactPoint.Type.Website);
  });
  it("should have an address", () => {
    expect(contact.address).toBe("https://a.f");
  });
});

describe("Build a faulty contact point", () => {
  let error = null;
  let contact = null;

  try {
    contact = new ContactPoint(0, "random-stuff");
  } catch (e) {
    error = e;
  }
  it("should throw a SyntexError on incorrect adress format", () => {
    expect(error).toBeInstanceOf(SyntaxError);
  });
});
