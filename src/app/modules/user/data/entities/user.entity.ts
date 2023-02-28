import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id_user: number;

  @ApiProperty()
  @Column()
  username: string;

  @Column()
  password: string;

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;
}
