import { UseCaseError } from '@/backend/core/errors/use-case-error';

export class UnexpectedError extends Error implements UseCaseError {
    // TODO: use locale
    constructor(error: string | undefined) {
        super(`Unexpected error: ${error || 'general error'}`); // TODO: locale
    }
}