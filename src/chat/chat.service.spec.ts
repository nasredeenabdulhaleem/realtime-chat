/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { CreateChatDto, FindAllChatDto } from './dto/chat.dto';
import { Chat, ChatDocument, ChatSchema } from './schemas/chat.schema';
import mongoose, { Connection, connect, Model, Types } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
// import { describe } from 'node:test';

describe('ChatService', () => {
  let service: ChatService;
  let mongoConnection: Connection;
  let chatModel: Model<Chat>;
  let testChat: ChatDocument;
  let testChatId: Types.ObjectId;
  beforeEach(async () => {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = mongoose.createConnection(uri);
    chatModel = mongoConnection.model(Chat.name, ChatSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        { provide: getModelToken(Chat.name), useValue: chatModel },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);

    testChatId = new Types.ObjectId();
    testChat = new chatModel({
      senderId: 'chat001',
      receiverId: 'chat002',
      content: 'Hello',
      timestamp: new Date(),
    });
    await testChat.save();
  });

  afterAll(async () => {
    // Closing the DB connection allows Jest to exit successfully.
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    // await mongod.stop();
  });

  // afterAll(async (done) => {
  //   // Closing the DB connection allows Jest to exit successfully.
  //   mongoConnection.dropDatabase();
  //   mongoConnection.close();
  //   done();
  //   // try {
  //   //   await mongoose.connection.close();
  //   //   done()
  //   // } catch (error) {
  //   //   console.log(error);
  //   //   done()
  //   // }
  // });

  // afterAll(async () => {

  //   // await mongod.stop();
  // });

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
  it('should have a createChat method', () => {
    expect(service.createChat).toBeDefined();
  });

  it('should create a chat', async () => {
    const chatDto: CreateChatDto = {
      senderId: 'chat001',
      receiverId: 'chat002',
      content: 'Hello',
      timestamp: new Date(),
    };
    // const chat = new Chat(chatDto); // Fix: Pass chatDto as an argument to the Chat constructor
    // jest.spyOn(model, 'save').mockResolvedValue(chat);
    const result = await service.createChat(chatDto);
    expect(result.content).toEqual(chatDto.content);
  });

  it('should get a chats from the server', async () => {
    const findAllDto: FindAllChatDto = {
      senderId: 'chat001',
      receiverId: 'chat002',
    };
    const Chats = await service.getChats(findAllDto);
    console.log(Chats);
    expect(service.getChats).toBeDefined();
  });
});
