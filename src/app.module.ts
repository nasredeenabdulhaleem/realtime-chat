import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
// import { MongooseModule } from '@nestjs/mongoose';
// ,MongooseModule.forRoot('mongodb://localhost/nest')
@Module({
  imports: [ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}