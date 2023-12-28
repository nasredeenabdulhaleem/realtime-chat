/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User, UserDocument, UserSchema } from './schemas/user.schema';
import mongoose, { Connection, connect, Model, Types } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { NotFoundException } from '@nestjs/common';
import { UserDTOStub } from './stubs/user.dto.stub';
import { UsersDTOStub } from './stubs/users.dto.stub';
import { CreateUsersDto } from './dto/create-users.dto';
import { describe } from 'node:test';

describe('UserService', () => {
  let service: UserService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;
  let testUser: UserDocument;
  let testUserId: Types.ObjectId;

  // beforeEach(async () => {
  //   model = new Model<UserDocument>();
  //   // model: Model<UserDocument> = new Model<UserDocument>();
  //   // model.find = jest.fn().mockResolvedValue([]);
  //   // model.findOne = jest.fn().mockResolvedValue({});
  //   // model.create = jest.fn().mockResolvedValue({});
  //   // model = getModelForClass(UserSchema);
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       UserService,
  //       {
  //         provide: getModelToken(User.name),
  //         useValue: {
  //           model: mongoose.model<UserDocument>(
  //             User.name,
  //             UserSchema, // Update the argument passed to the mongoose.Schema constructor
  //           ),
  //         },
  //       },
  //     ],
  //   }).compile();

  //   service = module.get<UserService>(UserService);
  // });

  beforeEach(async () => {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = mongoose.createConnection(uri);
    userModel = mongoConnection.model(User.name, UserSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken(User.name), useValue: userModel },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    // model = module.get<Model<UserDocument>>(getModelToken(User.name));
    testUserId = new Types.ObjectId();

    testUser = new userModel({
      _id: testUserId,
      chat_id: 'chat-001',
      username: 'Vinicius Santos de Pontes',
      role: 'user',
      createdAt: new Date(),
    });
    await testUser.save();
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    // await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createUser and test for created user', () => {
    it('should create a user', async () => {
      const createdUser = await service.createUser(UserDTOStub());
      expect(createdUser.chat_id).toBe(UserDTOStub().chat_id);
    });

    it('should get a user by id', async () => {
      // Define the expected result
      const result = {
        _id: testUserId, // Convert ObjectId to string
        chat_id: 'chat-001',
        username: 'Vinicius Santos de Pontes',
        role: 'user',
        // createdAt: expect.any(Date), // Match any Date object
      };

      // Call the service method
      const user = await service.getUserById(testUserId.toString());

      // Remove the createdAt property from the returned user
      const { createdAt, ...userWithoutCreatedAt } = user.toObject();
      const id = testUserId.toString();
      // Check that the returned user matches the expected result
      expect(user).toBeDefined();
      expect(user._id.toString()).toEqual(id);
    });
  });
  it('should throw an error if user not found', async () => {
    await expect(service.getUserById('1')).rejects.toThrow(NotFoundException);
  });

  it('should get all users', async () => {
    const users = await service.getAllUsers();
    expect(users).toBeDefined();
  });

  describe('userExists', () => {
    it('should return true if user exists', async () => {
      const userExists = await service.userExists(testUserId.toString());
      expect(userExists).toBe(true);
    });

    it('should return false if user does not exist', async () => {
      const nonExistentUserId = new Types.ObjectId().toString();
      const userExists = await service.userExists(nonExistentUserId);
      expect(userExists).toBe(false);
    });
  });

  it('should create multiple users', async () => {
    const users = await service.createUsers(UsersDTOStub().users);
    expect(users.length).toBe(2);
  });
});
