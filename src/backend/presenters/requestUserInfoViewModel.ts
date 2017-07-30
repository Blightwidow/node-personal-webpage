import * as Interface from "../interfaces"

export class RequestUserInfoViewModel implements Interface.ViewModel {
  readonly success: boolean;
  readonly data: Object;
  readonly errorMessage: string;

  constructor(userData = {}, success: boolean, message: string) {
    this.success = success;
    this.errorMessage = message;
    this.data = userData;

    this.data.title = `${userData.fullName} online resume`;
    this.data.headerTitle = userData.fullName
    this.data.headerSubtitile = userData.position;
    //foreach contact point => add image
  }
}
