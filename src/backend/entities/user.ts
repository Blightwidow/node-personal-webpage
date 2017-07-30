import { ContactPoint } from "./";

export class User {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly dateOfBirth: Date;
  readonly position: string;
  readonly contactInfos: Array<ContactPoint>;
  readonly biography: Array<string>;
  private static DATE_OF_BIRTH_FORMAT = /^\d{2}-\d{2}-\d{4}$/;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    dateOfBirthString: string, // FORMAT: MM-DD-YYYY
    position: string,
    contactInfos: Array<ContactPoint>,
    biography: Array<string>
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.contactInfos = contactInfos;
    this.position = position;
    if (User.DATE_OF_BIRTH_FORMAT.test(dateOfBirthString)) {
      this.dateOfBirth = new Date(dateOfBirthString);
    } else {
      throw new SyntaxError(
        "Uncorrect date string format, expected MM-DD-YYYY"
      );
    }
    this.biography = biography;
  }
}
