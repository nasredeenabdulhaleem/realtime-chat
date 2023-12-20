import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  
  myName(): string {
    return 'Nasredeen';
  }
}

