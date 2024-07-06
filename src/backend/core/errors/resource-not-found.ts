import { UseCaseError } from '@/backend/core/errors/use-case-error';
import { capitalizeFirstLetter } from '@/lib/utils';

export class ResourceNotFound extends Error implements UseCaseError {
    // TODO: use locale
    constructor(resource: string) {
        super(`${capitalizeFirstLetter(resource)} not found`);
    }
}