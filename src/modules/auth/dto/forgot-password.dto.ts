import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}
