import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async createChat(senderId: string, receiverId: string, content: string): Promise<Chat> {
    const createdChat = new this.chatModel({ senderId, receiverId, content });
    return createdChat.save();
  }

  async getChats(senderId: string, receiverId: string): Promise<Chat[]> {
    return this.chatModel
      .find({
        $or: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      })
      .sort('timestamp')
      .exec();
  }
}