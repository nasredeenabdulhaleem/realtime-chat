/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto, FindAllChatDto } from './dto/chat.dto';
import { ChatGateway } from './chat.gateway';
import { ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private chatGateway: ChatGateway,
  ) {}

  //   @Post()
  //   async create(@Body() body: CreateChatDto) {
  //     this.chatGateway.handleMessage(body);
  //     return this.chatService.createChat(body);
  //   }

  @Get('connected-clients')
  getConnectedClients() {
    return this.chatGateway.getAllConnectedClients();
  }

  @Post()
  async findAll(@Body() body: FindAllChatDto) {
    return this.chatService.getChats(body);
  }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.chatService.findOne(id);
  //   }
}
