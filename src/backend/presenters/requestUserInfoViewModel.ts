import * as Interface from "../interfaces";
import * as Entity from "../entities";

export class RequestUserInfoViewModel implements Interface.ViewModel {
  readonly success: boolean;
  readonly data: any;
  readonly errorMessage: string;

  constructor(userData: any = {}, success: boolean, message: string) {
    this.success = success;
    this.errorMessage = message;
    if (success) {
      this.data = userData;
      this.data.title = `${userData.fullname} online resume`;
      this.data.headerTitle = userData.fullname;
      this.data.headerSubtitle = userData.position;
      this.data.email = this.formatEmail(userData.email);
    }
  }

  private formatEmail(email: string): string {
    if (email) {
      return `mailto:${email}`;
    } else {
      return undefined;
    }
  }
}
