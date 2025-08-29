import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AfterInsert, AfterUpdate, Repository } from 'typeorm';
import { user } from './users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(user) private repo: Repository<user>){}

    create(email:string,password:string){
        const user=this.repo.create({email,password})
        return this.repo.save(user);
    }
   
    findOne(id:number){
        if(!id){
            return null;
        }
        return this.repo.findOne({ where: { id } });
    }

    find(email: string){
        return this.repo.find({ where: { email } });
    }

    async update(id:number,attrs:Partial<user>){
        const user=await this.findOne(id);
        if(!user){
            throw new Error('User Not Found');

        }
        Object.assign(user,attrs);
        return this.repo.save(user);
    }

    async remove(id:number){  //remove(entity)    or delete(id)
        console.log("deeleted User with Id")
        const user=await this.findOne(id);
         if(!user){
            throw new Error('User Not Found');
        }
        return this.repo.remove(user);

    }
}

// const userService =new UsersService({} as any);
// userService.update(1,{})
