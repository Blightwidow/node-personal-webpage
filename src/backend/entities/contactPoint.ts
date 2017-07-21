enum ContactPointType {
  Email,
  Phone,
  Github,
  Linkedin,
  Website
}

export class ContactPoint {
  static readonly Type = ContactPointType;
  readonly type: ContactPointType;
  readonly address: string;
  private static ADRESS_FORMAT = /^(tel:\d+|https?:\/\/\S+.\S+|mailto:\S+\.\S+)$/;

  constructor(type: ContactPointType, address: string) {
    this.type = type;
    if (ContactPoint.ADRESS_FORMAT.test(address)) {
      this.address = address;
    } else {
      throw new SyntaxError(
        "Incorrect address format, expect tel | http | mailto"
      );
    }
  }
}
