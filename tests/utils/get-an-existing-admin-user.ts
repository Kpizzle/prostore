

export class ExistingUser {

  firstName: string;
  lastName: string;
  email: string;
  password: string;
  fullName: string;
  isAdmin: Boolean;

  constructor() {
    this.firstName = 'John';
    this.lastName = 'Doe';
    this.email = `${this.firstName.toLowerCase()}.${this.lastName.toLowerCase()}@example.com`;
    this.password = 'SecurePass123'; // A consistent password
    this.fullName = `${this.firstName} ${this.lastName}`;
    this.isAdmin = true;
  }

  static create(): ExistingUser {
    return new ExistingUser();
  }
}
