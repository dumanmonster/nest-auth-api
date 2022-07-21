import { IsString } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  public readonly role: string;
}
