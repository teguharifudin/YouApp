import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop()
  username: string;

  @Prop({
    required: true,
  })
  fullName: string;
  
  @Prop({ 
    required: true,
  })
  gender: string;

  @Prop({
    required: true,
  })
  birthday: string;

  @Prop()
  horoscope: string;

  @Prop()
  zodiac: string;

  @Prop()
  height: string;

  @Prop()
  weight: string;

  @Prop()
  interest: string;

  @Prop()
  file: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updateAt: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
