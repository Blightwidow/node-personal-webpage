import * as Presenter from "../src/backend/presenters";
import * as Dto from "../src/backend/dtos";
import * as Entity from "../src/backend/entities";

const presenter = new Presenter.RequestUserInfoPresenter();

describe("Present a complete user", () => {
  const user = new Entity.User(
      "theo",
      "dammaretz",
      "01-14-1993",
      "Web and Software engineer",
      ["Bonjour", "Je suis theo"],
      "theo@dammaretz.fr",
      "https://github.com/Blightwidow",
      "https://www.linkedin.com/in/theodammaretz/",
      "https://github.com/Blightwidow/latex-cv/raw/build/cv.pdf",
    );
  const vm = presenter.handle(new Dto.UserInfoResponseMessage(user, true, ""));

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
      biography: ["Bonjour", "Je suis theo"],
      email: "mailto:theo@dammaretz.fr",
      linkedin: "https://www.linkedin.com/in/theodammaretz/",
      github: "https://github.com/Blightwidow",
      resume: "https://github.com/Blightwidow/latex-cv/raw/build/cv.pdf"
    });
  });
});


describe("Present an error message", () => {
  const user = undefined;
  const vm = presenter.handle(new Dto.UserInfoResponseMessage(user, false, "Random error"));

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
