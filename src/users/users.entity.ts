import { Entity,Column,PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRecover, AfterRemove } from "typeorm";

@Entity()
export class user{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    password:string;

     @AfterInsert()
    logInsert(){
        console.log("Iserted user with ID",this.id)
    }

    @AfterUpdate()
    logUpdate(){
         console.log("Updated user with ID",this.id)
    }

    @AfterRemove()
    logRemove(){
         console.log("Updated user with ID",this.id)
    }
}