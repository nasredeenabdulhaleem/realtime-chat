/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop()
  content!: string;

  @Prop({ type: String, ref: 'User' })
  senderId!: string;

  @Prop({ type: String, ref: 'User' })
  receiverId!: string;

  @Prop({ default: Date.now })
  timestamp!: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
