/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto, FindAllChatDto } from './dto/chat.dto';
import { ChatGateway } from './chat.gateway';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

// @UseGuards(RolesGuard)
@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private chatGateway: ChatGateway,
  ) {}

  // @Roles('admin')
  @Get('connected-clients')
  getConnectedClients() {
    return this.chatGateway.getAllConnectedClients();
  }

  // @Roles('admin')
  @Post()
  async findAll(@Body() body: FindAllChatDto) {
    return this.chatService.getChats(body);
  }

  // @Roles('admin')
  @Get(':id')
  async findAllUserChats(@Param('id') id: string) {
    return this.chatService.getAllUserChats(id);
  }

  @Get(':sender_id/:receiver_id')
  async findChat(
    @Param('sender_id') sender_id: string,
    @Param('receiver_id') receiver_id: string,
  ) {
    return this.chatService.newgetChats(sender_id, receiver_id);
  }
  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.chatService.findOne(id);
  //   }
}
