import { Chat } from '../schemas/chat.schema';
export declare class CreateChatDto extends Chat {
}
export declare class FindAllChatDto {
    readonly senderId: string;
    readonly receiverId: string;
}
