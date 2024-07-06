import { UseCaseError } from '@/backend/core/errors/use-case-error';

export class ResourceDuplicatedByFieldError extends Error implements UseCaseError {
    // TODO: use locale
    constructor(resource: string, field:string, value:string) {
        super(`Another ${resource} found with '${field}' = '${value}`);
    }
}