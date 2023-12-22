import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { Chat, ChatSchema } from './schemas/chat.schema';
// @Module({
//   controllers: [ChatController],
//   providers: [ChatService],
// })
// export class ChatModule {}


// @Module({
//   imports: [WebSocketModule],
//   controllers: [ChatController],
//   providers: [ChatService],
// })
// export class ChatModule {}

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    // other imports...
  ],
  controllers: [],
  providers: [ChatService,ChatGateway],
})
export class ChatModule {}