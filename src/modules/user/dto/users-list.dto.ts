import { IsNotEmpty, IsUUID } from 'class-validator';

export class UsersListDto {
  @IsNotEmpty()
  @IsUUID('4', { each: true })
  userId: string[];
}
