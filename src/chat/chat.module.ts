import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatSchema } from './schemas/chat.schema';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
