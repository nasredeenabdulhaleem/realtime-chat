/* eslint-disable @typescript-eslint/no-unused-vars */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtMiddleware } from './auth/jwt.middleware';
// import { RolesGuard } from './auth/roles.guard';

dotenv.config();

const Password = process.env.MONGO_PASSWORD;
const jwtSecret = process.env.JWT_SECRET;

// , MongooseModule.forRoot(`mongodb+srv://nabdulhaleem09:${Password}@nasredeen.ni4lrcy.mongodb.net/?retryWrites=true&w=majority`)
@Module({
  imports: [
    ChatModule,
    UserModule,
    MongooseModule.forRoot(
      `mongodb+srv://nabdulhaleem09:${Password}@nasredeen.ni4lrcy.mongodb.net/?retryWrites=true&w=majority`,
    ),
    // PassportModule,
    // JwtModule.register({
    //   secret: jwtSecret,
    //   signOptions: { expiresIn: '60s' },
    // }),
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
// export class AppModule implements NestModule {
// configure(consumer: MiddlewareConsumer) {
//   consumer.apply(JwtMiddleware).forRoutes('*'); // apply the middleware to all routes
// }
// }
