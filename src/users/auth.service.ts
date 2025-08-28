import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes,scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt=promisify(_scrypt)
@Injectable()
export class AuthService{
    constructor(private userService:UsersService){}

    async signUp(email:string,password:string){
        //1.see if email is already in use 

        const users=await this.userService.find(email);
        if(users.length){
            throw new BadRequestException('email in use');
        }

        //2.hash the users password
        const salt=randomBytes(8).toString('hex');
        const hash=(await scrypt(password,salt,32)) as Buffer;
        const result=salt+'.'+hash.toString('hex');
        

        //3.create a new user and save
        //4.return the user
        const user=await this.userService.create(email,result);
        return user;
    }

    async signin(email:string,password:string){
        const [user]=await this.userService.find(email);
        if(!user){
            throw new NotFoundException('user Not Found');
        }
        
        const [salt,storedhash]=user.password.split('.');
        const hash=(await scrypt(password,salt,32)) as Buffer;
        if(storedhash!==hash.toString('hex')){
            throw new BadRequestException('Not correct Password Try Again');
        }
        return user;
    }

}