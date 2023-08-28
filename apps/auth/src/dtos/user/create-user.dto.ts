import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string
  @IsOptional()
  readonly hashPassword?: string
}
