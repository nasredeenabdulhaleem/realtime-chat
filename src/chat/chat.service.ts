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

  // async getChats(body: any): Promise<Chat[]> {
  //   const { senderId, receiverId } = body;
  //   return this.chatModel
  //     .find({
  //       $or: [
  //         { senderId: senderId, receiverId: receiverId },
  //         { senderId: receiverId, receiverId: senderId },
  //       ],
  //     })
  //     .sort('timestamp')
  //     .exec();
  // }
  async getChats(body: any): Promise<Chat[]> {
    const { senderId, receiverId } = body;
    return this.chatModel
      .find({
        $or: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      })
      .populate('senderId receiverId')
      .sort('timestamp')
      .exec();
  }

  // async getAllUserChats(userId: string): Promise<Chat[]> {
  //   return this.chatModel
  //     .find({
  //       $or: [{ senderId: userId }],
  //     })
  //     .sort('timestamp')
  //     .exec();
  // }
  // async getChat(sender_id, receiver_id): Promise<Chat[]> {
  //   return this.chatModel
  //     .find({
  //       $or: [
  //         { senderId: sender_id, receiverId: receiver_id },
  //         // { senderId: receiver_id, receiverId: sender_id },
  //       ],
  //     })
  //     .sort('timestamp')
  //     .exec();
  // }
  async getChat(sender_id: string, receiver_id: string): Promise<Chat[]> {
    return this.chatModel
      .find({
        $or: [
          { senderId: sender_id, receiverId: receiver_id },
          { senderId: receiver_id, receiverId: sender_id },
        ],
      })
      .populate('senderId receiverId')
      .sort('timestamp')
      .exec();
  }
  async newgetChats(sender_id: string, receiver_id: string): Promise<Chat[]> {
    return this.chatModel
      .find({
        $or: [
          { senderId: sender_id, receiverId: receiver_id },
          { senderId: receiver_id, receiverId: sender_id },
        ],
      })
      .sort('timestamp')
      .exec();
  }

  async getAllUserChats(userId: string): Promise<Chat[]> {
    return this.chatModel
      .aggregate([
        {
          $match: {
            $or: [{ senderId: userId }, { receiverId: userId }],
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $group: {
            _id: {
              $cond: [
                { $eq: ['$senderId', userId] },
                '$receiverId',
                '$senderId',
              ],
            },
            doc: { $first: '$$ROOT' },
          },
        },
        {
          $replaceRoot: { newRoot: '$doc' },
        },
      ])
      .exec();
  }
}
