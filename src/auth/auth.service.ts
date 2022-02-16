import { SignupUserInput } from './dto/signup-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import  * as bycrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService , 
        private jwtService: JwtService
    ){}

    async validateUser(email: string, password: string): Promise <any> {
        const user = await this.usersService.findOne(email);
        
        const valid = await bycrypt.compare(password, user?.password);

        if(user && valid) {
            const {password, ...result} = user;
            return result;
        }

        return null;
    }

    async login(user: User){
        return {
            access_token: this.jwtService.sign({email: user.email, sub : user.id}),
            user
        }
    }


    async signup(signupUserInput: SignupUserInput){
         const user = await this.usersService.findOne(signupUserInput.email);

         if(user){
             throw new Error("User already exists!")
         }

         const password =await bycrypt.hash(signupUserInput.password, 10);
    
         return this.usersService.create({
            ...signupUserInput,
            password
         }
         )

    }
}
