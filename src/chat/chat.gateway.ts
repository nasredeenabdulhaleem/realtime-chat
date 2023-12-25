// import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

// @WebSocketGateway()
// export class ChatGateway {
//   @SubscribeMessage('message')
//   handleMessage(client: any, payload: any): string {
//     return 'Hello world!';
//   }
// }

// import {
//   SubscribeMessage,
//   MessageBody,
//   ConnectedSocket,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Socket } from 'socket.io';
// import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
// import { Server } from 'socket.io';

// @WebSocketGateway()
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   private server!: Server;
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   handleConnection(client: Socket) {
//     // Handle connection event
//   }
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   handleDisconnect(client: Socket) {
//     // Handle disconnection event
//   }

//   @SubscribeMessage('message')
//   handleMessage(
//     @MessageBody() data: string,
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     @ConnectedSocket() client: Socket,
//   ) {
//     // Handle received message
//     this.server.emit('message', data); // Broadcast the message to all connected clients
//   }
// }

import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Observable, from, map } from 'rxjs';
import { Server, Socket } from 'socket.io';

// import { wsAuthMiddleware } from './ws-auth.middleware';

// const SECRET = 'secret-key';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server) {
    console.log('WebSocket Initialized');
    // server.use(wsAuthMiddleware(SECRET));
  }

  // listen for send_message events
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @ConnectedSocket() client: Socket,
  ) {
    const { data } = message;
    console.log(data);
    this.server.emit('message', message); // Broadcast the message to all connected clients
    // client.emit('message', message); // Emit the message back to the client
    return message;
  }

  @SubscribeMessage('events')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log(data);
    return from([1, 2, 3, 4]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }
}
