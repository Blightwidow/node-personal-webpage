import { RequestUserInfoPresenter } from "../src/backend/presenters";
import { UserInfoResponseMessage } from "../src/backend/dtos";
import { User, ContactPoint } from "../src/backend/entities";

const presenter = new RequestUserInfoPresenter();

describe("Present a complete user", () => {
  const user = new User(
    0,
    "theo",
    "dammaretz",
    "01-14-1993",
    "Web and Software engineer",
    [
      new ContactPoint(ContactPoint.Type.Email, "theo@dammaretz.fr"),
      new ContactPoint(ContactPoint.Type.Website, "http://dammaretz.fr"),
      new ContactPoint(ContactPoint.Type.Phone, "+33476891901"),
      new ContactPoint(ContactPoint.Type.Resume, "http://a.f")
    ],
    [
      "Bonjour",
      "Je suis theo"
    ]);
  const vm = presenter.handle(new UserInfoResponseMessage(user, true, ""));

  it("should be a success", () => {
    expect(vm.success).toBeTruthy();
  });
  it("should have an address", () => {
    expect(vm.errorMessage).toBeFalsy();
  });
  it("should be correctly formated", () => {
    expect(vm.data).toMatchObject({
      title: "Theo Dammaretz online resume",
      headerTitle: "Theo Dammaretz",
      headerSubtitle: "Web and Software engineer",
      contactPoints: [{
        address: "mailto:theo@dammaretz.fr",
        type: "email"
      }, {
        address: "http://dammaretz.fr",
        type: "website"
      }, {
        address: "tel:+33476891901",
        type: "phone"
      }],
      biography: ["Bonjour", "Je suis theo"],
      resumeAddress: "http://a.f"
    });
  });
});


describe("Present an error message", () => {
  const user = undefined;
  const vm = presenter.handle(new UserInfoResponseMessage(user, false, "Random error"));

  it("should be a success", () => {
    expect(vm.success).toBeFalsy();
  });
  it("should have an address", () => {
    expect(vm.errorMessage).toEqual("Random error");
  });
  it("should be correctly formated", () => {
    expect(vm.data).toEqual(undefined);
  });
});
