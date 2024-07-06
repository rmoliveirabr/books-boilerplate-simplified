import { UseCaseResponse, Error, Response } from '@/backend/core/use-case-response';
import { ResourceNotFound } from '@/backend/core/errors/resource-not-found';
import { UserAlreadyExists } from "@/backend/domain/customer/usecases/errors/user-already-exists";

import { UserRepository } from "@/backend/domain/customer/repositories/user-repository";
import { User } from "@/backend/domain/customer/entities/user";
import { HashGenerator } from "@/backend/domain/customer/hash/hash-generator";

type SignUpRequest = {
  username: string;
  password: string;
  name?: string;
  phone?: string;
};

type SignUpResponse = UseCaseResponse<
  UserAlreadyExists | ResourceNotFound,
  {
    user: User;
  }
>;

export class SignUp {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    username,
    password,
    phone,
  }: SignUpRequest): Promise<SignUpResponse> {

      const userExists = await this.userRepository.findByUsername(username);

      if (userExists) {
        return new Error(new UserAlreadyExists(username));
      }

      const hashPassword = await this.hashGenerator.generator(password);

      const user = User.create({
        username,
        name,
        phone,
        password: hashPassword,
        active: true,
      });

      await this.userRepository.create(user);

      return new Response({ user });
    }
}
