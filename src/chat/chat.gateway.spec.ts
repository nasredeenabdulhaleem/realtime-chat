/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { Socket, Server } from 'socket.io';
import { describe } from 'node:test';

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let mockSocket: Socket;
  let mockServer: Server;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatGateway,
        { provide: ChatService, useValue: { createChat: jest.fn() } },
      ],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
    mockSocket = { handshake: { query: { userId: 'testUser' } } } as any;
    mockServer = { emit: jest.fn() } as any;
    gateway.server = mockServer;
    // service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
  it('should have a handleConnection method', () => {
    expect(gateway.handleConnection).toBeDefined();
  });

  it('should add a user to connectedClients on handleConnection', () => {
    gateway.handleConnection(mockSocket);
    expect(gateway.getAllConnectedClients()).toContain('testUser');
  });

  it('should have a handleDisconnect method', () => {
    expect(gateway.handleDisconnect).toBeDefined();
  });

  it('should remove a user from connectedClients on handleDisconnect', () => {
    gateway.handleConnection(mockSocket);
    gateway.handleDisconnect(mockSocket);
    expect(gateway.getAllConnectedClients()).not.toContain('testUser');
  });
  it('should have a handleMessage method', async () => {
    expect(gateway.handleMessage).toBeDefined();
    const message = { receiverId: 'testUser', content: 'Hello' };
    const response = await gateway.handleMessage(message);
    expect(response).toEqual({ event: 'message', data: 'Hello' });
  });

  it('should emit a message to all clients on handleMessage', async () => {
    const message = { receiverId: 'testUser', content: 'Hello' };
    await gateway.handleMessage(message);
    expect(mockServer.emit).toHaveBeenCalledWith('message', 'Hello');
  });
});
