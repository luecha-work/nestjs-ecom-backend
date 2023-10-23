import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

const passwordPattern = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])./;

export class UserCreateDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  role_id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(passwordPattern, {
    message: 'password is to weak',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(passwordPattern, {
    message: 'confirm password is to weak',
  })
  confirmPassword: string;
}
