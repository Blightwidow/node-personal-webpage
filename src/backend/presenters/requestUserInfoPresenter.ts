import * as Dto from "../dtos";
import * as Entity from "../entities";
import { RequestUserInfoViewModel } from "./";

export class RequestUserInfoPresenter {
  public handle(response: Dto.UserInfoResponseMessage): RequestUserInfoViewModel {
    if (response.success) {
      let userData = this.getFormattedUserData(response.user);
      return new RequestUserInfoViewModel(userData, true, "");
    } else {
      return new RequestUserInfoViewModel(undefined, false, response.message);
    }
  }

  private getFormattedUserData(user: Entity.User): Object {
    return {
      fullname: this.getFullname(user),
      position: user.position,
      contactPoints: this.getSocialLinks(user),
      biography: user.biography,
      resumeAddress: this.getResumeAddress(user)
    };
  }

  private getFullname(user: Entity.User): string {
    let firstName =
      user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
    let lastName =
      user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
    return `${firstName} ${lastName}`;
  }

  private getSocialLinks(user: Entity.User): Array<Object> {
    let socialLinks = [];
    for (var i = 0; i < user.contactInfos.length; i++) {
      let contact = user.contactInfos[i];
      if (contact.type !== Entity.ContactPoint.Type.Resume) {
        socialLinks.push(contact);
      }
    }
    return socialLinks;
  }

  // private formatSocialLink(address: string, type: number): string {
  //   switch (type) {
  //     case Entity.ContactPoint.Type.Website:
  //       return address;
  //     case Entity.ContactPoint.Type.Email:
  //       return `mailto:${address}`;
  //     case Entity.ContactPoint.Type.Phone:
  //       return `tel:${address}`;
  //     default:
  //       return undefined;
  //   }
  // }

  private getResumeAddress(user: Entity.User): string {
    for (var i = 0; i < user.contactInfos.length; i++) {
      if (user.contactInfos[i].type === Entity.ContactPoint.Type.Resume) {
        return user.contactInfos[i].address;
      }
    }
    return undefined;
  }
}
