import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();


const Password = process.env.MONGO_PASSWORD;


@Module({
  imports: [ChatModule, MongooseModule.forRoot(`mongodb+srv://nabdulhaleem09:${Password}@nasredeen.ni4lrcy.mongodb.net/?retryWrites=true&w=majority`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }