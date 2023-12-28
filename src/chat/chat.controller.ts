import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto, FindAllChatDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async create(@Body() body: CreateChatDto) {
    return this.chatService.createChat(body);
  }

  @Get()
  async findAll(@Body() body: FindAllChatDto) {
    return this.chatService.getChats(body);
  }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.chatService.findOne(id);
  //   }
}
