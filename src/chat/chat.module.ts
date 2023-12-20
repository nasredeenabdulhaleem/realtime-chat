import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
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
  providers: [ChatGateway],
})
export class ChatModule {}