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
      this.data.contactPoints = this.formatContactPoints(this.data.contactPoints);
    }
  }

  private formatContactPoints(contactPoints: Array<Entity.ContactPoint>): Array<any> {
    const formattedContactPoints = <Array<any>>contactPoints;
    for (let i = 0; i < contactPoints.length; i++) {
      formattedContactPoints[i].address = this.formatContactPointsAddress(contactPoints[i]);
    }
    return formattedContactPoints;
  }

  private formatContactPointsAddress(point: Entity.ContactPoint): string {
      switch (point.type) {
        case Entity.ContactPoint.Type.Website:
          return point.address;
        case Entity.ContactPoint.Type.Email:
          return `mailto:${point.address}`;
        case Entity.ContactPoint.Type.Phone:
          return `tel:${point.address}`;
        default:
          return undefined;
    }
  }
}
