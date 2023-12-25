import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
dotenv.config();

const Password = process.env.MONGO_PASSWORD;

// , MongooseModule.forRoot(`mongodb+srv://nabdulhaleem09:${Password}@nasredeen.ni4lrcy.mongodb.net/?retryWrites=true&w=majority`)
@Module({
  imports: [
    ChatModule,
    UserModule,
    MongooseModule.forRoot(
      `mongodb+srv://nabdulhaleem09:${Password}@nasredeen.ni4lrcy.mongodb.net/?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
