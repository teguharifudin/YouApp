import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './schemas/chat.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private chatModel: Model<Chat>) {}

  async sendMessage(senderId: string, receiverId: string, content: string): Promise<Chat> {
    const newMessage = new this.chatModel({ senderId, receiverId, content });
    return newMessage.save();
  }

  async setMessageDelivered(messageId: string): Promise<Chat> {
    return this.chatModel.findByIdAndUpdate(
      messageId,
      { delivered: true },
      { new: true },
    );
  }

  async setMessageRead(messageId: string): Promise<Chat> {
    return this.chatModel.findByIdAndUpdate(
      messageId,
      { read: true },
      { new: true },
    );
  }

  async receiveMessages(receiverId: string): Promise<Chat[]> {
    return this.chatModel.find({ receiverId }).exec();
  }
}
