import { Body, Controller, Delete, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { createUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { Serialze } from 'src/Interceptors/seralize.interceptor';
import { UserDto } from './user.dto';
import { IsEmail } from 'class-validator';
import { AuthService } from './auth.service';


@Controller('users')

export class UsersController {

    constructor(private userService : UsersService,private authService:AuthService){}
    @Post('/signup')
    createUser(@Body() body:createUserDto){
        // this.userService.create(body.email,body.password);
        this.authService.signUp(body.email,body.password);
        console.log(body)
    }


    //different way using query params   http://localhost:3000/users/filter/?email=tejaqwe@gmail.com&password=teja123
    @Post('/filter')
     createUserusingquery(@Query() query:createUserDto){
        console.log(query);
     }

    @Post('/signIn')
    signIn(@Body() body:createUserDto){
        return this.authService.signin(body.email,body.password);
    }

    // @UseInterceptors(new SerilizerInterceptor(UserDto))
    @Serialze(UserDto)
    @Get('/:id')
    findUser(@Param('id') id:string){
        console.log("handler is running")
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
