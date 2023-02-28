import { Module } from '@nestjs/common';
import { UserController } from "./controllers/user.controller";
import { UserEntity } from "./data/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./services/user.service";

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserService
  ]
})
export class UserModule {}
