import { IsNotEmpty, MinLength } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  category: string;
}
