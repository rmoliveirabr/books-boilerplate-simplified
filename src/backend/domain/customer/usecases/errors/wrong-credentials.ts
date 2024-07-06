import { UseCaseError } from "@/backend/core/errors/use-case-error";

export class WrongCredentials extends Error implements UseCaseError {
  // TODO: use locale
  constructor() {
    super(`Wrong credentials`);
  }
}
