import { UserRepository } from '@/backend/domain/customer/repositories/user-repository';
import { User } from '@/backend/domain/customer/entities/user';
import { ResourceNotFound } from '@/backend/core/errors/resource-not-found'
import { UseCaseResponse, Error, Response } from '@/backend/core/use-case-response';

type UserResponse = UseCaseResponse<
    ResourceNotFound,
    {
      user: User;
    }
>;

export class GetUser {
    constructor(private userRepository: UserRepository) {}
  
    async execute(username: string): Promise<UserResponse> {
        var user = await this.userRepository.findByUsername(username);
        if (user) return new Response({ user:user });
        else return new Error(new ResourceNotFound('user'));
    }
}
  