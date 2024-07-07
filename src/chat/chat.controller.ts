import { Controller, Post, Get, Patch, Param, Body, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Chat')
@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('sendMessage')
  async sendMessage(@Body() createChatDto: CreateChatDto, @Req() req: any) {
    const senderId = req.user.username;
    const { receiverId, content } = createChatDto;
    return this.chatService.sendMessage(senderId, receiverId, content);
  }

  @Patch('delivered/:messageId')
  async setMessageDelivered(@Param('messageId') messageId: string) {
    return this.chatService.setMessageDelivered(messageId);
  }

  @Patch('read/:messageId')
  async setMessageRead(@Param('messageId') messageId: string) {
    return this.chatService.setMessageRead(messageId);
  }

  @Get('viewMessage/:receiverId')
  async receiveMessages(@Param('receiverId') receiverId: string, @Req() req: any) {
    if (req.user.username !== receiverId ) {
      throw new UnauthorizedException('Unauthorized!');
    }
    return this.chatService.receiveMessages(receiverId);
  }
}
