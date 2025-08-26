import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { createUserDto } from './create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService : UsersService){}
    @Post('/signup')
    createUser(@Body() body:createUserDto){
        this.userService.create(body.email,body.password);
        console.log(body)
    }

    @Get('/:id')
    findUser(@Param('id') id:string){
        return this.userService.findOne(parseInt(id));
    }

    @Get()
    findAllUsers(@Query('email') email:string){
        return this.userService.find(email);
    }

    @Delete('/id')
    removeUser(@Param('id') id:string){
        return this.userService.remove(parseInt(id));
    }

}
