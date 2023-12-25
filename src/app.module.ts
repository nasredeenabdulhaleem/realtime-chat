import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
// import { ChatsController } from './chats/chats.controller';
// import { ChatsService } from './chats/chats.service';
import { ChatService } from './chat/chat.service';
import { ChatController } from './chat/chat.controller';
import * as dotenv from 'dotenv';
dotenv.config();

// const Password = process.env.MONGO_PASSWORD;

// , MongooseModule.forRoot(`mongodb+srv://nabdulhaleem09:${Password}@nasredeen.ni4lrcy.mongodb.net/?retryWrites=true&w=majority`)
@Module({
  imports: [],
  controllers: [ ChatController],
  providers: [ChatGateway, ChatService],
})
export class AppModule {}
