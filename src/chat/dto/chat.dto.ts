import { Chat } from '../schemas/chat.schema';
export class CreateChatDto extends Chat {}
export class FindAllChatDto {
  readonly senderId: string;
  readonly receiverId: string;
}
