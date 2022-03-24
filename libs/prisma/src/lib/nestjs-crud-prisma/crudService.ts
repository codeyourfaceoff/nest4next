import { CrudService as NestJSXCrudService } from '@nestjsx/crud';

export abstract class CrudService<T> extends NestJSXCrudService<T> {}
