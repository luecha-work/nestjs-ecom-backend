import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import { Request } from 'express';
import { Users } from 'src/db/entities/Users';
import { GetUser } from 'src/modules/auth/decorator/get-user.decorator';
import { AuthService } from '../auth/auth.service';
import { BaseResultError } from '../common/base-result-error.interface';
import { RoleService } from '../role/role.service';
import { BaseResultData } from './../common/base-result.interface';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UsersListDto } from './dto/users-list.dto';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard())
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private roleService: RoleService,
  ) {}

  @Get()
  async paginatePage(@Query('page') page: number) {
    try {
      const users: any = await this.userService.paginate(page, ['role']);

      return new BaseResultData('200', users, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    try {
      const user = await this.userService.findOne({ id }, ['role']);
      return new BaseResultData('200', user, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('users-to-adminmarket')
  async findUsersToAdminMarket(@Body() body: UsersListDto) {
    try {
      const userIds: string[] = body.userId;

      const users: any = await this.userService.findUsersToAdminMarket(userIds);

      return new BaseResultData('200', users, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<BaseResultData> {
    try {
      if (body.password !== body.confirmPassword) {
        throw new BadRequestException('Passwords do not match!');
      }

      const hashedPassword = await bcrypt.hash(body.password, 12);

      const { role_id, ...data } = body;

      const user: any = await this.userService.create({
        ...data,
        password: hashedPassword,
        role: { id: role_id },
      });

      return new BaseResultData('200', user, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('info')
  async updateInfo(@Req() request: Request, @Body() body: UserUpdateDto) {
    try {
      const id = await this.authService.userId(request);

      await this.userService.update(id, body);

      const user = await this.userService.findOne({ id });

      return new BaseResultData('200', user, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('password')
  async updatePassword(
    @Req() request: Request,
    @Body('password') password: string,
    @Body('password_confirm') password_confirm: string,
  ) {
    try {
      if (password !== password_confirm) {
        throw new BadRequestException('Passwords do not match!');
      }

      const id = await this.authService.userId(request);

      const hashed = await bcrypt.hash(password, 12);

      await this.userService.update(id, {
        password: hashed,
      });

      const user = await this.userService.findOne({ id });

      return new BaseResultData('200', user, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @Put(':id')
  // // @HasPermission('users')
  // async update(
  //   @Param('id') id: string,
  //   @Body() body: UserUpdateDto,
  //   @GetUser() user_info: Users,
  // ) {
  //   try {
  //     const { role_id, ...data } = body;

  //     await this.userService.update(id, {
  //       ...data,
  //       updateBy: user_info.email,
  //       updateAt: new Date(),
  //       role: { id: role_id },
  //     });
  //     const user = await this.userService.findOne({ id });

  //     return new BaseResultData('200', user, '', 'Success');
  //   } catch (error) {
  //     throw new HttpException(
  //       new BaseResultError('400', error.response?.message, error.message),
  //       error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() body: UserUpdateDto,
    @GetUser() user_info: Users,
  ) {
    try {
      const { role } = body;
      const roleData = await this.roleService.findRoleByName(role);

      const update = await this.userService.update(userId, {
        ...body,
        updateAt: new Date(),
        updateBy: user_info?.email,
        role: roleData,
      });

      return new BaseResultData('200', update, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  // @HasPermission('users')
  async delete(@Param('id') id: string) {
    try {
      await this.userService.delete(id);

      return new BaseResultData('200', [], '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
