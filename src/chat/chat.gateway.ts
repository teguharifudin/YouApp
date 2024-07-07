import { WebSocketGateway, SubscribeMessage, WebSocketServer, MessageBody, ConnectedSocket, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Injectable, Req } from '@nestjs/common';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(private messageService: ChatService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: { receiverId: string; content: string },
    @ConnectedSocket() client: Socket,
    @Req() req: any
  ) { 
    const senderId = req.user.username;
    const message = await this.messageService.sendMessage(
      senderId,
      data.receiverId,
      data.content,
    );
    this.server.to(data.receiverId).emit('newMessage', message);
  }

  @SubscribeMessage('messageDelivered')
  async messageDelivered(@MessageBody() messageId: string) {
    const message = await this.messageService.setMessageDelivered(messageId);
    this.server.to(message.senderId).emit('messageStatusChanged', message);
  }

  @SubscribeMessage('messageRead')
  async messageRead(@MessageBody() messageId: string) {
    const message = await this.messageService.setMessageRead(messageId);
    this.server.to(message.senderId).emit('messageStatusChanged', message);
  }
}
