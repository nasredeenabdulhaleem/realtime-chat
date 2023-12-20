import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  private messages: string[] = [];

  getMessages(): string[] {
    return this.messages;
  }

  addMessage(message: string): void {
    this.messages.push(message);
  }
}