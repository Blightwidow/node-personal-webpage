import * as Dto from "../dtos";
import * as Entity from "../entities";
import { RequestUserInfoViewModel } from "./";

export class RequestUserInfoPresenter {
  public handle(response: Dto.UserInfoResponseMessage): RequestUserInfoViewModel {
    if (response.success) {
      const userData = this.getFormattedUserData(response.user);
      return new RequestUserInfoViewModel(userData, true, "");
    } else {
      return new RequestUserInfoViewModel(undefined, false, response.message);
    }
  }

  private getFormattedUserData(user: Entity.User): any {
    return {
      fullname: this.getFullname(user),
      position: user.position,
      email: user.email,
      linkedin: user.linkedin,
      github: user.github,
      biography: user.biography,
      resume: user.resume
    };
  }

  private getFullname(user: Entity.User): string {
    const firstName =
      user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
    const lastName =
      user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
    return `${firstName} ${lastName}`;
  }
}
