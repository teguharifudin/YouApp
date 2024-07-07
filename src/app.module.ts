import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User, UserSchema } from './users/schemas/user.schema';
import { ProfileModule } from './profile/profile.module';
import { ChatModule } from './chat/chat.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({ 
        uri: process.env.MONGO_URI || 'mongodb://database:27017/youapp',
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema},
    ]),
    AuthModule,
    UsersModule,
    ProfileModule,
    ChatModule,
  ],
})
export class AppModule {}

