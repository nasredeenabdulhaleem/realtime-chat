import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

/**
 * Service class for managing user-related operations.
 */
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Creates a new user.
   * @param user The user object to be created.
   * @returns The created user object.
   * @throws Throws an error if there is an issue creating the user.
   */
  async createUser(createUserDto: CreateUserDto) {
    try {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a user by their ID.
   * @param id The ID of the user to retrieve.
   * @returns The user object with the specified ID.
   * @throws Throws a NotFoundException if the user is not found.
   */
  // async getUserById(id: string) {
  //   const user = await this.userModel.findById(id).exec();
  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }
  //   return user;
  // }

  // async getUserById(id: string) {
  //   try {
  //     const user = await this.userModel.findById(id).exec();
  //     if (!user) {
  //       throw new NotFoundException(`User with ID ${id} not found`);
  //     }
  //     return user;
  //   } catch (error) {
  //     throw new NotFoundException(`Invalid user ID: ${id}`);
  //   }
  // }
  async getUserById(id: string): Promise<UserDocument> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user; // Convert Mongoose document to plain JavaScript object
    } catch (error) {
      throw new NotFoundException(`Invalid user ID: ${id}`);
    }
  }

  /**
   * Retrieves all users.
   * @returns An array of all user objects.
   * @throws Throws an error if there is an issue retrieving the users.
   */
  async getAllUsers() {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Checks if a user with the specified ID exists.
   * @param userId The ID of the user to check.
   * @returns A boolean indicating whether the user exists or not.
   * @throws Throws an error if there is an issue checking the user existence.
   */
  async userExists(userId: string): Promise<boolean> {
    // try {
    const user = await this.userModel.findById(userId).exec();
    return !!user;
    // } catch (error) {
    //   throw new NotFoundException(`Invalid user ID: ${userId}`);
    // }
  }

  /**
   * Creates multiple users.
   * @param users An array of user objects to be created.
   * @returns An array of created user objects.
   * @throws Throws an error if there is an issue creating the users.
   */
  async createUsers(createUserDtos: CreateUserDto[]) {
    try {
      const createdUsers = createUserDtos.map((dto) => new this.userModel(dto));
      return await Promise.all(createdUsers.map((user) => user.save()));
    } catch (error) {
      throw error;
    }
  }
}
