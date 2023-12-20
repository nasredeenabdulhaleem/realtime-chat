import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit {
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