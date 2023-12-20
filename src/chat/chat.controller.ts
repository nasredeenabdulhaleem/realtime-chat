// import { Controller, Get } from '@nestjs/common';
// import { ChatService } from './chat.service';
import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

// @Controller('chat')
// export class ChatController {
//   constructor(private chatService: ChatService) {}

//   @Get()
//   getChat(): string {
//     return this.chatService.getChat();
//   }
// }

@WebSocketGateway()
export class ChatController implements OnGatewayInit {
  @WebSocketServer()
  server!: Server;

  afterInit(server: Server) {
    console.log('WebSocket Initialized');
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}