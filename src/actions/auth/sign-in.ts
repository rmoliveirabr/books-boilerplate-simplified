'use server';

import { AuthUseCases } from '@/actions/auth/auth-use-cases';
import { WrongCredentials } from '@/backend/domain/customer/usecases/errors/wrong-credentials';
import { UnexpectedError } from '@/backend/core/errors/unexpected-error';

export type SignInRequest = {
  email: string;
  password: string;
}

export async function signIn(body: SignInRequest) {
  const { email, password } = body;

  // console.log('signIn action', email, password);

  const response = await AuthUseCases.getInstance().signInUseCase.execute({
    username: email,
    password,
  });

  if (response.isError()) {
    const error = response.getError();

    console.log(error);

    switch (error?.constructor) {
      case WrongCredentials:
        console.log('WrongCredentials');
        throw error;
      default:
        console.log(error?.message);
        throw new UnexpectedError(error?.message);
    }
  }

  const data = response.getResponse();
  if (!data) {
    throw new UnexpectedError(response.getError()?.message);
  }

  const { accessToken, id, username } = data;  

  return {
    access_token: accessToken,
    email,
    id,
    username,
  };
}