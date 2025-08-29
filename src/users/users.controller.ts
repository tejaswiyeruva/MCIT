import { Body, Controller, Delete, Get, Param, Post, Query,Session } from '@nestjs/common';
import { createUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { Serialze } from 'src/Interceptors/seralize.interceptor';
import { UserDto } from './user.dto';
import { IsEmail } from 'class-validator';
import { AuthService } from './auth.service';
import { CurrentUser } from './custom decorator/current-user.decorator';


@Controller('users')

export class UsersController {

    constructor(private userService : UsersService,private authService:AuthService){}

    @Post('/signup')
    async createUser(@Body() body:createUserDto ,@Session() session:any){
        // this.userService.create(body.email,body.password);
        const user=await this.authService.signUp(body.email,body.password);
        session.userId=user.id;
        return user;
    }

    // @Get('/WhoamI')
    // whoAmI(@Session() session:any){
    //     console.log(session.userId)
    //     return this.userService.findOne(session.userId);
    // }

     @Get('/WhoamI')
    whoAmI(@CurrentUser() user:string){
        return user;
    }

    @Post('/signOut')
    signOut(@Session() session:any){
        session.userId=null;

    }

    //different way using query params   http://localhost:3000/users/filter/?email=tejaqwe@gmail.com&password=teja123
    @Post('/Signup using POST')
     createUserusingquery(@Query() query:createUserDto){
        console.log(query);
     }

    @Post('/signIn')
    async signIn(@Body() body:createUserDto ,@Session() session:any){
        const user=await this.authService.signin(body.email,body.password);
        session.userId=user.id;
        return user;
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
