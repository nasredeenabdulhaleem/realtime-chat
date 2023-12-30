import {
  // ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
// import { Observable, from, map } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';

// import { wsAuthMiddleware } from './ws-auth.middleware';

// const SECRET = 'secret-key';
@UseGuards(RolesGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}
  private connectedClients: Map<string, Socket> = new Map();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server) {
    console.log('WebSocket Initialized');
    // server.use(wsAuthMiddleware(SECRET));
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.connectedClients.set(userId, client);
      console.log(`User ${userId} connected`);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = this.findUserIdBySocket(client);
    if (userId) {
      this.connectedClients.delete(userId);
      console.log(`User ${userId} disconnected`);
    }
  }

  private findUserIdBySocket(client: Socket): string | undefined {
    for (const [userId, socket] of this.connectedClients) {
      if (socket === client) {
        return userId;
      }
    }
    return undefined;
  }

  getAllConnectedClients() {
    return Array.from(this.connectedClients.keys());
  }

  // listen for send_message events
  @Roles('admin')
  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() message: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // @ConnectedSocket() client: Socket,
  ): Promise<WsResponse<string>> {
    const { receiverId, content } = message;
    const receiverSocket = this.connectedClients.get(receiverId);
    console.log('message', content);
    await this.chatService.createChat(message);
    if (receiverSocket) {
      // If the receiver is connected, emit the message directly to them
      receiverSocket.emit('message', content);
    }

    this.server.emit('message', content); // Broadcast the message to all connected clients
    return { event: 'message', data: content };
  }

  // @SubscribeMessage('events')
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   console.log(data);
  //   return from([1, 2, 3, 4]).pipe(
  //     map((item) => ({ event: 'events', data: item })),
  //   );
  // }
}
