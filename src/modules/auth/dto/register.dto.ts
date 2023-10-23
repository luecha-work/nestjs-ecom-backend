import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @MaxLength(10)
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty()
  dateOfBirth: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  detailAddress: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is to weak',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'confirm password is to weak',
  })
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  province: string;

  @IsNotEmpty()
  @IsString()
  amphoe: string;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @IsNotEmpty()
  roleCode: string;

  @IsNotEmpty()
  market: {
    marketName: string;
    marketCode: string;
    discription: string;
  };

  // imageProfile: FormData;
}
