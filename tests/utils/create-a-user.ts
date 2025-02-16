import { faker } from '@faker-js/faker';

export enum UserRole {
  REGULAR = "regular",
  ADMIN = "admin",
}

export class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  fullName: string;
  isAdmin: boolean;

  constructor(role: UserRole = UserRole.REGULAR) {
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.email = `${this.firstName.toLowerCase()}.${this.lastName.toLowerCase()}@example.com`;
    this.password = faker.internet.password({length: 10});
    this.fullName = `${this.firstName} ${this.lastName}`;
    this.isAdmin = role === UserRole.ADMIN;
  }

  static create(role: UserRole = UserRole.REGULAR): User {
    return new User(role);
  }
}
