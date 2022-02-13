import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from './auth.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse } from './dto/login-response';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService){}

    @Mutation(() => LoginResponse)
    login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
        return this.authService.login(loginUserInput);
    }
}
 