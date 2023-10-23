import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Users } from 'src/db/entities/Users';
import { GetUser } from 'src/modules/auth/decorator/get-user.decorator';
import { BaseResultError } from '../common/base-result-error.interface';
import { BaseResultData } from '../common/base-result.interface';
import { RoleService } from './role.service';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get('register')
  async getRoleNoNAdmin() {
    try {
      const roles = await this.roleService.getRoleNoNAdmin();

      let result = new BaseResultData('200', roles, '', 'Success');

      return result;
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard())
  @Get()
  async all(@GetUser() user: Users) {
    try {
      const roles = await this.roleService.all();

      return new BaseResultData('200', roles, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard())
  @Post()
  async create(@Body('name') name: string, @Body('permissions') ids: number[]) {
    try {
      const role_code = await this.roleService.countRole();

      const role = await this.roleService.create({
        roleName: name,
        roleCode: role_code + 1,
        active: true,
        createBy: '',
        updateBy: '',
        createAt: new Date(),
        updateAt: new Date(),
      });

      return new BaseResultData('201', role, '', 'Success created');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  async get(@Param('id') id: number) {
    try {
      const role = await this.roleService.findOne({ id });

      return new BaseResultData('200', role, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard())
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('permissions') ids: number[],
    @GetUser() user_info: Users,
  ) {
    try {
      await this.roleService.update(id, { name });

      const role = await this.roleService.findOne({ id });

      const role_update = await this.roleService.create({
        ...role,
        updateBy: user_info.email,
        updateAt: new Date(),
      });

      return new BaseResultData('200', role_update, '', 'Success');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  //   @HasPermission('roles')
  async delete(@Param('id') id: number) {
    try {
      await this.roleService.delete(id);

      return new BaseResultData('200', [], '', 'Success deleted successfully');
    } catch (error) {
      throw new HttpException(
        new BaseResultError('400', error.response?.message, error.message),
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
