import {
  ArrayNotEmpty,
  ArrayMinSize,
  IsOptional,
  IsNumberString,
  Length,
  IsAscii,
  IsInt,
  Allow,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class DeleteRoleDto {
  @ArrayNotEmpty()
  @Expose()
  roleIds: number[];
}

export class CreateRoleDto {
  @Length(2)
  @Expose()
  name: string;

  @IsAscii()
  @Expose()
  label: string;

  @Allow()
  @Expose()
  remark: string;

  @IsOptional()
  @ArrayMinSize(0)
  @Expose()
  menus: number[];

  @IsOptional()
  @ArrayMinSize(0)
  @Expose()
  depts: number[];
}

export class UpdateRoleDto extends CreateRoleDto {
  @IsInt()
  @Expose()
  roleId: number;
}

export class InfoRoleDto {
  @IsNumberString()
  @Expose()
  roleId: string;
}
