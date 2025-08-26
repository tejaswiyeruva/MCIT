import{
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { plainToClass } from 'class-transformer';


//wrapping the Interceptor in a decorator
export function Serialze(dto:any){
    return UseInterceptors(new SerilizerInterceptor(dto));
}

export class SerilizerInterceptor implements NestInterceptor{
    constructor(private dto:any){}


    intercept( context:ExecutionContext,handler:CallHandler): Observable<any>{
       //before it is handled by request handler
       console.log('I am running before handler',context)

       return handler.handle().pipe(
        map((data:any)=>{
            //run befoire response sent
            console.log('I am running before respone sent out',data)
            return plainToClass(this.dto,data,{
                excludeExtraneousValues:true,
            })
        })
       )
    }
}