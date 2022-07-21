import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { Body, ClassSerializerInterceptor, Controller, Inject, Put, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';

import { UpdateRoleDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Put('role')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private updateRole(
    @Body() body: UpdateRoleDto,
    @Req() req: Request,
  ): Promise<User> {
    return this.service.updateRole(body, req);
  }
}
