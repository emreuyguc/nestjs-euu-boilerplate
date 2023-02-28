import { IsEmpty, IsNotEmpty } from "class-validator";

export class JwtPayload{
  @IsNotEmpty()
  id_user:number

  @IsNotEmpty()
  username:string
}

