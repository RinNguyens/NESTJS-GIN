import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class createUserProfileDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  dob: string;
}