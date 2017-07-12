import * as supertest from "supertest";
import * as assert from "assert";
const request = supertest("http://localhost:3000");

describe("GET /random-url", () => {
    it("should return 404", () => {
        return request.get("/random-url")
            .expect(404);
    });
});
