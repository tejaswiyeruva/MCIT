import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { user } from './users.entity';
import { AuthService } from './auth.service';

@Module({
    imports:[TypeOrmModule.forFeature([user])],
    controllers:[UsersController],
    providers:[UsersService,AuthService]
})
export class UsersModule {}
