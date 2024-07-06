'use server'

import { AuthUseCases } from '@/actions/auth/auth-use-cases';
import { UserAlreadyExists } from '@/backend/domain/customer/usecases/errors/user-already-exists';
import { ResourceNotFound } from '@/backend/core/errors/resource-not-found';
import { UnexpectedError } from '@/backend/core/errors/unexpected-error';

export type SignUpRequest = {
  name: string
  username: string
  password: string
  phone: string
}

export async function signUp({ name, username, password, phone }: SignUpRequest) {
  try {
    const signUp = await AuthUseCases.getInstance().signUpUseCase.execute({
      name,
      username,
      password,
      phone,
    });
  
    if (signUp.isError()) {
      const error = signUp.getError();
  
      switch (error?.constructor) {
        case UserAlreadyExists:
          console.log('UserAlreadyExists');
          throw error;
        case ResourceNotFound:
          console.log('ResourceNotFound');
          throw error;
        default:
          console.log(error?.message);
          throw new UnexpectedError(error?.message);
      }
    } 
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
      }
    }
  }

    // NOTE: if successful, do nothing
    // return signUp.getResponse();
  
  //   const response = await http.post('/signup', {
  //     name,
  //     email: username,
  //     password,
  //     phone,
  //     // terms,
  //   })

  //   if (!response.ok) {
  //     const data = await response.json()
  //     throw new Error(data.message)
  //   }
  // } catch (error) {
  //   if (error instanceof Error) {
  //     return {
  //       message: error.message,
  //     }
  //   }
  // }
}
