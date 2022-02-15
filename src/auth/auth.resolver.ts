import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from './auth.service';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse } from './dto/login-response';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guard/gql-auth.guard';
import { SignupUserInput } from './dto/signup-user.input';
import { SignupResponse } from './dto/signup-response';
import { User } from 'src/users/entities/user.entity';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService){}

    @Mutation(() => LoginResponse)
   @UseGuards(GqlAuthGuard)
    login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context) {
        return this.authService.login(context.user);
    }

    @Mutation(() => User)
     signup(@Args('signupUserInput') signupUserInput: SignupUserInput, @Context() context) {
         return this.authService.signup(signupUserInput);
     }
}
 