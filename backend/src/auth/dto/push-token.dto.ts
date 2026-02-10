import { IsString, IsNotEmpty } from 'class-validator';

export class PushTokenDto {
  @IsString()
  @IsNotEmpty()
  pushToken: string;
}