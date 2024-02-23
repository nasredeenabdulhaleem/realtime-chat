import { WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
export declare class ChatGateway {
    private readonly chatService;
    server: Server;
    constructor(chatService: ChatService);
    private connectedClients;
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    private findUserIdBySocket;
    getAllConnectedClients(): string[];
    handleMessage(message: any): Promise<WsResponse<string>>;
}
