import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';


@ObjectType()
export class SignupResponse {
    
    @Field((() =>User))
    user: User
} 