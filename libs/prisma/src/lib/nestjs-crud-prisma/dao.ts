// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Prisma } from '@prisma/client';
export type Dict = { [k: string]: any };

export type DictWithId = {
  id?: number;
  [k: string]: any;
};

export type SelectWithId = {
  id?: boolean;
  [k: string]: any;
};

export type Delegate<ModelType = any> = {
  findMany: (arg: {
    select?: SelectWithId | null;
    include?: Dict | null;
    where?: Dict;
    orderBy?: Prisma.Enumerable<any>;
    cursor?: Dict;
    take?: number;
    skip?: number;
    distinct?: Prisma.Enumerable<any>;
  }) => ModelType[];

  findFirst: (arg: {
    select?: SelectWithId | null;
    rejectOnNotFound?: Prisma.RejectOnNotFound;
    include?: Dict | null;
    where?: DictWithId;
    orderBy?: Prisma.Enumerable<ModelType>;
    cursor?: Dict;
    take?: number;
    skip?: number;
    distinct?: Prisma.Enumerable<ModelType>;
  }) => ModelType;

  create: (arg: {
    select?: SelectWithId | null;
    include?: Dict | null;
    data: ModelType;
  }) => ModelType;

  update: (arg: {
    select?: SelectWithId | null;
    include?: Dict | null;
    data: ModelType;
    where: DictWithId;
  }) => ModelType;

  delete: (arg: {
    select?: SelectWithId | null;
    include?: Dict | null;
    where: DictWithId;
  }) => ModelType;

  [k: string]: any;
};

type FindManyWhereArg<T extends Delegate> = Parameters<
  T['findMany']
>[0]['where'];
type FindFirstWhereArg<T extends Delegate> = Parameters<
  T['findFirst']
>[0]['where'];
type CreateDataArg<T extends Delegate> = Parameters<T['create']>[0]['data'];
type UpdateDataArg<T extends Delegate> = Parameters<T['update']>[0]['data'];

export abstract class DaoManager<T extends Delegate> {
  abstract get delegate(): T;

  getMany(where: FindManyWhereArg<T>) {
    return this.delegate.findMany({ where });
  }

  getOne(where: FindFirstWhereArg<T>) {
    return this.delegate.findFirst({ where });
  }

  create(data: CreateDataArg<T>) {
    return this.delegate.create({ data });
  }

  update(id: number, data: UpdateDataArg<T>) {
    return this.delegate.update({ data, where: { id } });
  }

  delete(id: number) {
    return this.delegate.delete({ where: { id } });
  }
}
