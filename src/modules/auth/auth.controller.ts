import { AdminMarketService } from './../market/admin-market.service';
import { MarketService } from './../market/market.service';
import { BaseResultError } from './../common/base-result-error.interface';
import { RoleService } from './../role/role.service';
import { UserService } from './../user/user.service';
import { UserAddressService } from './../user-address/user-address.service';
import { TambonsService } from './../tambons/tambons.service';
import { LoginDto } from './dto/login.dto';
import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { BaseResultData } from '../common/base-result.interface';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ApiTags } from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private authService: AuthService,
        private tambonsService: TambonsService,
        private userAddressService: UserAddressService,
        private roleService: RoleService,
        private marketService: MarketService,
        private adminMarketService: AdminMarketService,
    ) { }

    @Post('register')
    async register(@Body() body: RegisterDto): Promise<BaseResultData> {
        try {
            const {
                firstname,
                lastname,
                phoneNumber,
                email,
                dateOfBirth,
                gender,
                detailAddress,
                password,
                confirmPassword,
                province,
                amphoe,
                district,
                zipCode,
                roleCode,
                market,
            } = body;

            if (password !== confirmPassword) {
                throw new BadRequestException('Passwords do not match!');
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const tombans = await this.tambonsService.getTambonDetail(
                district,
                amphoe,
                province,
                zipCode,
            );

            const role = await this.roleService.findOne({ where: { roleCode } });

            const user = await this.userService.create({
                firstname,
                lastname,
                phoneNumber,
                email,
                dateOfBirth,
                gender,
                active: true,
                password: hashedPassword,
                createAt: new Date(),
                updateAt: new Date(),
                createBy: 'register',
                role: { id: role.id },
            });

            await this.userAddressService.create({
                detailAddress,
                createAt: new Date(),
                updateAt: new Date(),
                tambons: tombans,
                users: user,
            });

            if (roleCode === '2') {
                const createdMarket = await this.marketService.create({
                    ...market,
                    createAt: new Date(),
                    updateAt: new Date(),
                    updateBy: '',
                    createBy: 'register',
                });

                await this.adminMarketService.create({
                    users: user,
                    markets: createdMarket,
                });
            }

            const result = await this.userService.getUsersWithRelations(user.id);

            return new BaseResultData('201', result, '', 'Success');
        } catch (error) {
            throw new HttpException(
                new BaseResultError('400', error.response?.message, error.message),
                error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post('login')
    async login(
        @Body() body: LoginDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<BaseResultData> {
        try {
            const { email, password } = body;
            const user = await this.userService.findOne({ email }, ['role']);

            if (!user) {
                throw new NotFoundException('User not found');
            }

            if (!(await bcrypt.compare(password, user.password))) {
                throw new BadRequestException('Invalid credentials');
            }

            const jwt = await this.jwtService.signAsync({ id: user.id });

            // เปลี่ยนการตั้งค่า cookie ให้ทำงานกับ cross-domain
            response.cookie('access_token', jwt, {
                httpOnly: false,
                secure: true,
                sameSite: 'none', // จำเป็นสำหรับ cross-domain
            });

            return new BaseResultData('200', user, jwt, 'Success');
        } catch (error) {
            throw new HttpException(
                new BaseResultError('400', error.response?.message, error.message),
                error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @UseGuards(AuthGuard())
    @Get('user-info')
    async user(@Req() request: Request) {
        try {
            const id = await this.authService.userId(request);

            const user = await this.userService.findOne({ id }, ['role']);

            return new BaseResultData('200', user, '', 'Success');
        } catch (error) {
            throw new HttpException(
                new BaseResultError('400', error.response?.message, error.message),
                error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @UseGuards(AuthGuard())
    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        try {
            response.clearCookie('access_token');

            return new BaseResultData('200', [], '', 'Success logout');
        } catch (error) {
            throw new HttpException(
                new BaseResultError('400', error.response?.message, error.message),
                error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('user-by-email')
    async findUserByEmail(@Query('email') email: string) {
        try {
            const user = await this.userService.findOne({ email }, ['role']);

            if (!user) {
                throw new NotFoundException('User not found');
            }

            return new BaseResultData('200', user, '', 'Success');
        } catch (error) {
            throw new HttpException(
                new BaseResultError('400', error.response?.message, error.message),
                error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Patch('forgot-password/:user_id')
    async forgotPassword(
        @Param('user_id') UserId: string,
        @Body() body: ForgotPasswordDto,
    ) {
        try {
            const { password, confirmPassword } = body;

            if (password !== confirmPassword) {
                throw new BadRequestException('Passwords do not match!');
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = await this.userService.update(UserId, {
                password: hashedPassword,
                updateBy: 'forgot-password',
                updateAt: new Date(),
            });

            return new BaseResultData('200', user, '', 'Success');
        } catch (error) {
            throw new HttpException(
                new BaseResultError('400', error.response?.message, error.message),
                error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
