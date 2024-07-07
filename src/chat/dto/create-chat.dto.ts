import { ApiHideProperty, ApiProperty, } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateChatDto {
    
    @ApiHideProperty()
    @IsString()
    @IsNotEmpty()
    senderId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    receiverId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;

    timestamp: Date;

    delivered: boolean;

    read: boolean;

}
