import { UseCaseResponse, Error, Response } from '@/backend/core/use-case-response';
import { ResourceNotFound } from '@/backend/core/errors/resource-not-found';
import { WrongCredentials } from "@/backend/domain/customer/usecases/errors/wrong-credentials";
import { NotAllowed } from "@/backend/domain/customer/usecases/errors/not-allowed";

import { UserRepository } from "@/backend/domain/customer/repositories/user-repository";
import { HashCompare } from "@/backend/domain/customer/hash/hash-compare";
import { HashEncrypt } from "@/backend/domain/customer/hash/hash-encrypt";

export type SignInRequest = {
  username: string;
  password: string;
};

export type SignInResponse = UseCaseResponse<
  ResourceNotFound | NotAllowed | WrongCredentials,
  {
    accessToken: string;
    id: string;
    username: string;
  }
>;

export class SignIn {
  constructor(
    private userRepository: UserRepository,
    private hashCompare: HashCompare,
    private hashEncrypt: HashEncrypt,
  ) {}

  async execute({
    username,
    password,
  }: SignInRequest): Promise<SignInResponse> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      return new Error(new WrongCredentials());
    }

    const passwordValid = await this.hashCompare.compare(
      password,
      user.password,
    );

    if (!passwordValid) {
      return new Error(new WrongCredentials());
    }

    const accessToken = await this.hashEncrypt.encrypt({
      sub: user.id.toString(),
      username: user.username,
    });

    return new Response({
      accessToken,
      id: user.id.toString(),
      username: user.username
    });
  }
}
