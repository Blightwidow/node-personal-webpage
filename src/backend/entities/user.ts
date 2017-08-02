export class User {
  readonly dateOfBirth: Date;
  private static DATE_OF_BIRTH_FORMAT = /^\d{2}-\d{2}-\d{4}$/;

  constructor(
    readonly firstName: string,
    readonly lastName: string,
    dateOfBirthString: string, // FORMAT: MM-DD-YYYY
    readonly position: string,
    readonly biography: Array<string>,
    readonly email: string = "",
    readonly github: string = "",
    readonly linkedin: string = "",
    readonly resume: string = "",
  ) {
    if (User.DATE_OF_BIRTH_FORMAT.test(dateOfBirthString)) {
      this.dateOfBirth = new Date(dateOfBirthString);
    } else {
      throw new SyntaxError(
        "Uncorrect date string format, expected MM-DD-YYYY"
      );
    }
  }
}
