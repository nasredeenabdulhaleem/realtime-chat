import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { ChatService } from "./chat.service";
// import { wsAuthMiddleware } from './ws-auth.middleware';

// const SECRET = 'secret-key';

@WebSocketGateway({
  namespace: "chat",
  cors: { origin: "http://127.0.0.1:5500", credentials: true },
})
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer()
  server!: Server;

  constructor(private chatService: ChatService) {}

  afterInit(server: Server) {
    console.log("WebSocket Initialized");
    // server.use(wsAuthMiddleware(SECRET));
  }

  @SubscribeMessage("message")
  async handleMessage(
    client: any,
    {
      senderId,
      receiverId,
      content,
    }: { senderId: string; receiverId: string; content: string }
  ): Promise<void> {
    // Save the chat message
    console.log(content);
    await this.chatService.createChat(senderId, receiverId, content);
    
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
