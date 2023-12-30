import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { FindAllChatDto } from './dto/chat.dto';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

describe('ChatController', () => {
  let controller: ChatController;
  let chatService: ChatService;
  let chatGateway: ChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [
        {
          provide: ChatService,
          useValue: {
            getChats: jest.fn(),
          },
        },
        {
          provide: ChatGateway,
          useValue: {
            getAllConnectedClients: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ChatController>(ChatController);
    chatService = module.get<ChatService>(ChatService);
    chatGateway = module.get<ChatGateway>(ChatGateway);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should call the getChats method of the chatService with correct parameters', async () => {
    const findAllChatDto: FindAllChatDto = {
      senderId: 'chat001',
      receiverId: 'chat002',
    };
    await controller.findAll(findAllChatDto);
    expect(chatService.getChats).toHaveBeenCalledWith(findAllChatDto);
  });

  it('should call the getAllConnectedClients method of the chatGateway', async () => {
    await controller.getConnectedClients();
    expect(chatGateway.getAllConnectedClients).toHaveBeenCalled();
  });
});
