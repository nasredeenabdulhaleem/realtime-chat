import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUsersDto } from './dto/create-users.dto';
// import { Types } from 'mongoose';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn().mockResolvedValue('createUser'),
            getAllUsers: jest.fn().mockResolvedValue('getAllUsers'),
            userExists: jest.fn().mockResolvedValue('userExists'),
            createUsers: jest.fn().mockResolvedValue('createUsers'),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a user', async () => {
    // const testUserId = new Types.ObjectId();
    const createUserDto: CreateUserDto = {
      // _id: testUserId,
      chat_id: 'chat-001',
      username: 'Vinicius Santos de Pontes',
      role: 'user',
      createdAt: new Date(),
    };
    await controller.addUser(createUserDto);
    expect(service.createUser).toHaveBeenCalledWith(createUserDto);
    // expect(await controller.addUser({} as any)).toBe('createUser');
    // expect(service.createUser).toHaveBeenCalled();
  });

  it('should get all users', async () => {
    expect(await controller.getAllUsers()).toBe('getAllUsers');
    expect(service.getAllUsers).toHaveBeenCalled();
  });

  it('should check if user exists', async () => {
    expect(await controller.userExists('1')).toBe('userExists');
    expect(service.userExists).toHaveBeenCalled();
  });
  it('should create multiple users', async () => {
    const createUsersDto: CreateUsersDto = {
      users: [
        {
          chat_id: 'chat-001',
          username: 'Vinicius Santos de Pontes',
          role: 'user',
          createdAt: new Date(),
        },
        {
          chat_id: 'chat-002',
          username: 'Santos de Pontes',
          role: 'admin',
          createdAt: new Date(),
        },
      ],
    };
    await controller.addUsers(createUsersDto);
    expect(service.createUsers).toHaveBeenCalledWith(createUsersDto.users);
    // expect(await controller.addUsers({ users: [] } as any)).toBe('createUsers');
    // expect(service.createUsers).toHaveBeenCalled();
  });
});
