/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { CreateChatDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async createChat(body: CreateChatDto): Promise<Chat> {
    const { senderId, receiverId, content } = body;
    const createdChat = new this.chatModel({ senderId, receiverId, content });
    return createdChat.save();
  }

  async getChats(body: any): Promise<Chat[]> {
    const { senderId, receiverId } = body;
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
