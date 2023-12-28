import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

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
    expect(await controller.addUser({} as any)).toBe('createUser');
    expect(service.createUser).toHaveBeenCalled();
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
    expect(await controller.addUsers({ users: [] } as any)).toBe('createUsers');
    expect(service.createUsers).toHaveBeenCalled();
  });
});
