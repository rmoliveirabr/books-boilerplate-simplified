import { UserRepository } from '@/backend/domain/customer/repositories/user-repository';
import { PrismaUserRepository } from '@/backend/infra/database/prisma/repositories/prisma-user-repository';

import { HashGenerator } from '@/backend/domain/customer/hash/hash-generator';
import { HashCompare } from '@/backend/domain/customer/hash/hash-compare';
import { HashEncrypt } from '@/backend/domain/customer/hash/hash-encrypt';
import { BcryptHasher } from '@/backend/infra/hasher/bcrypt-hash';
import { JwtEncrypter } from '@/backend/infra/hasher/jwt-encrypter';

import { GetUser } from '@/backend/domain/customer/usecases/get-user';
import { SignUp } from '@/backend/domain/customer/usecases/sign-up';
import { SignIn } from '@/backend/domain/customer/usecases/sign-in';

import { decodeBase64Url } from '@/lib/utils'

export class AuthUseCases {
  private static instance: AuthUseCases;
  private userRepository: UserRepository;
  private hashGenerator: HashGenerator;
  private hashCompare: HashCompare;
  private hashEncrypt: HashEncrypt;

  public getUserUseCase: GetUser;
  public signUpUseCase: SignUp;
  public signInUseCase: SignIn;

  private constructor() {
    const privateKeyBase64 = process.env.JWT_PRIVATE_KEY_API || '';
    const secret = decodeBase64Url(privateKeyBase64);

    this.userRepository = new PrismaUserRepository();
    this.hashGenerator = new BcryptHasher();
    this.hashCompare = new BcryptHasher();
    this.hashEncrypt = new JwtEncrypter(secret);

    this.getUserUseCase = new GetUser(this.userRepository);
    this.signUpUseCase = new SignUp(this.userRepository, this.hashGenerator);
    this.signInUseCase = new SignIn(this.userRepository, this.hashCompare, this.hashEncrypt);
  }

  // singleton
  public static getInstance(): AuthUseCases {
    if (!AuthUseCases.instance) {
      AuthUseCases.instance = new AuthUseCases();
    }
    return AuthUseCases.instance;
  }
}