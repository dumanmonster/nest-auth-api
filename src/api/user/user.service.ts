import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';

import { UpdateRoleDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async updateRole(body: UpdateRoleDto, req: Request): Promise<User> {
    const user: User = <User>req.user;

    user.role = body.role;

    return this.repository.save(user);
  }
}
