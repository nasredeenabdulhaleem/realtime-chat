import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { ChatService } from "./chat.service";
import { Socket } from "socket.io";
// import { wsAuthMiddleware } from './ws-auth.middleware';

// const SECRET = 'secret-key';

@WebSocketGateway({
  namespace: "chat",
  cors: { origin: "http://127.0.0.1:5500", credentials: true },
})
export class ChatGateway implements OnGatewayInit {
  // @WebSocketServer()
  // server!: Server;

  constructor(private chatService: ChatService) {}

  afterInit(server: Server) {
    console.log("WebSocket Initialized");
    // server.use(wsAuthMiddleware(SECRET));
  }

  @SubscribeMessage("message")
  async handleMessage(
    @MessageBody() body: { senderId: string; receiverId: string; content: string },
    @ConnectedSocket() client: Socket,
  ): Promise<string> {
    const { senderId, receiverId, content } = body;
    console.log(body);
    // Save the chat message
    client.on('message', (message: string) => {
      console.log(message);
      client.emit('message', message);
    });
    // await this.chatService.createChat(senderId, receiverId, content);

    // // Broadcast the message to all connected clients
    // this.server.emit("message", { senderId, receiverId, content });
    
    return content;
  }

  @SubscribeMessage("joinChat")
  async handleJoinChat(
    client: any,
    { senderId, receiverId }: { senderId: string; receiverId: string }
  ): Promise<void> {
    // Retrieve the chat messages
    const chats = await this.chatService.getChats(senderId, receiverId);

    // Emit the chat messages to the client
    client.emit("chats", chats);
  }
}
