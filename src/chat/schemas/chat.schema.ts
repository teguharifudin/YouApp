import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Chat extends Document {
  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  receiverId: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop({ default: false })
  delivered: boolean;

  @Prop({ default: false })
  read: boolean;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
