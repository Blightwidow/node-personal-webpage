enum ContactPointType {
  Email,
  Phone,
  Website,
  Resume
}

export class ContactPoint {
  static readonly Type = ContactPointType;
  readonly type: ContactPointType;
  readonly address: string;
  private static ADRESS_FORMAT = /^(\d+|https?:\/\/\S+.\S+|\S+@\S+\.\S+)$/;

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
