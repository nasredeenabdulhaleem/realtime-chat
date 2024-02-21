/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Chat } from '../../chat/schemas/chat.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  chat_id: string;

  @Prop()
  username: string;

  @Prop()
  role: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: [{ type: String, ref: 'Chat' }] })
  chats!: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
