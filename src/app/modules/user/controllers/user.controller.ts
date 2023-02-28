import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "../data/entities/user.entity";
import { JwtAuthGuard } from "../../auth/guards/jwt.guard";


@ApiTags('user')
@Controller("user")
export class UserController {
  constructor(private readonly userService:UserService) { }


  @ApiBearerAuth()
  @Get("/:id")
  @UseGuards(JwtAuthGuard)
  @ApiParam({name:'id',required:true})
  @ApiResponse({type: UserEntity })
  async getUser(@Param('id') id:number): Promise<UserEntity> {
    return this.userService.getUserById(id);
  }


}
