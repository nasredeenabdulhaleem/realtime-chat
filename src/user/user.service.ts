import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [];

  createUser(user) {
    this.users.push(user);
  }

  getAllUsers() {
    return this.users;
  }
}
