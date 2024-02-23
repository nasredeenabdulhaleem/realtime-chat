import { ChatService } from './chat.service';
import { FindAllChatDto } from './dto/chat.dto';
import { ChatGateway } from './chat.gateway';
export declare class ChatController {
    private readonly chatService;
    private chatGateway;
    constructor(chatService: ChatService, chatGateway: ChatGateway);
    getConnectedClients(): string[];
    findAll(body: FindAllChatDto): Promise<import("./schemas/chat.schema").Chat[]>;
    findAllUserChats(id: string): Promise<import("./schemas/chat.schema").Chat[]>;
    findChat(sender_id: string, receiver_id: string): Promise<import("./schemas/chat.schema").Chat[]>;
}
