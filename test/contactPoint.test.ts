import { ContactPoint } from "../src/backend/entities";

describe("Build a simple contact point", () => {
  let error = null;
  let contact = null;

  try {
    contact = new ContactPoint(0, "tel:000");
  } catch (e) {
    error = e;
  }
  it("should have a type", () => {
    expect(contact.type).toEqual(ContactPoint.Type.Email);
  });
  it("should have an address", () => {
    expect(contact.address).toBe("tel:000");
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
