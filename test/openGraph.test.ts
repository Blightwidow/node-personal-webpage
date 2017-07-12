import * as supertest from "supertest";
const request = supertest("http://localhost:3000");

describe("openGraph", () => {
  it("should have a valid openGraph markup", () => {
    return request.get("/")
      .expect(200);
  });
});
