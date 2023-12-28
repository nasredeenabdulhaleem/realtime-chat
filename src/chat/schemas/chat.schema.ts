import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop()
  content!: string;

  @Prop({ type: String })
  senderId!: string;

  @Prop({ type: String })
  receiverId!: string;

  @Prop({ default: Date.now })
  timestamp!: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
