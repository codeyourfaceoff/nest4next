/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */
import camelcase from 'lodash.camelcase';
import mapSeriesAsync from 'map-series-async';
import { isArrayFull, objKeys, isObject } from '@nestjsx/util';
import {
  CreateManyDto,
  CrudRequest,
  GetManyDefaultResponse,
} from '@nestjsx/crud';
import {
  ComparisonOperator,
  QueryFilter,
  QuerySort,
  SCondition,
} from '@nestjsx/crud-request';
import {
  CrudService,
  WhereInput,
  HashMap,
  PrismaFilter,
} from './nestjs-crud-prisma';
import { PrismaClient } from '@prisma/client';

export interface OrderBy {
  [key: string]: 'asc' | 'desc' | undefined;
}

export interface Operator {
  startsWith?: string | undefined;
  contains?: string | undefined;
  equals?: string | undefined;
}

export interface Where {
  [key: string]: string | Operator | Date;
}

export enum ColumnType {
  String = 'STRING',
  DateTime = 'DATE_TIME',
  Boolean = 'BOOLEAN',
  Int = 'INT',
}

export interface ColumnTypes {
  [key: string]: ColumnType;
}

export type FilterNotStartingWith<
  Set,
  Needle extends string
> = Set extends `${Needle}${infer _X}` ? never : Set;
export type PrismaModelKeys = FilterNotStartingWith<keyof PrismaClient, '$'>;

export class PrismaCrudService<ModelType> extends CrudService<ModelType> {
  public tableName: PrismaModelKeys;

  public client: PrismaClient[PrismaModelKeys];

  private columns: ColumnTypes | undefined;

  constructor(public prisma: PrismaClient, entity: Function) {
    super();
    this.tableName = camelcase(entity.name) as PrismaModelKeys;
    this.client = this.prisma[this.tableName];
    this.getColumns();
  }

  async getColumns(): Promise<ColumnTypes> {
    if (this.columns) return this.columns;
    // @ts-ignore
    const result = (await this.client.findMany({ take: 1 }))?.[0] || {};
    this.columns = Object.entries(result).reduce(
      (columns: ColumnTypes, [key, value]: [string, any]) => {
        columns[key] = this.getColumnTypeFromValue(value);
        return columns;
      },
      {}
    );
    return this.columns;
  }

  getColumnTypeFromValue(value: any): ColumnType {
    switch (typeof value) {
      case 'string':
        return ColumnType.String;
      case 'object':
        return ColumnType.DateTime;
      case 'boolean':
        return ColumnType.Boolean;
      case 'number':
        return ColumnType.Int;
      default:
        return ColumnType.String;
    }
  }

  async getMany({
    parsed,
    options,
  }: CrudRequest): Promise<GetManyDefaultResponse<ModelType> | ModelType[]> {
    const isPaginated = this.decidePagination(parsed, options);
    try {
      // @ts-ignore
      const result = await this.client.findMany({
        ...(parsed.sort.length > 0
          ? {
              orderBy: {
                ...parsed.sort.reduce(
                  (orderBy: OrderBy, querySort: QuerySort) => {
                    orderBy[querySort.field] = (
                      querySort.order || 'ASC'
                    ).toLowerCase() as 'asc' | 'desc';
                    return orderBy;
                  },
                  {}
                ),
              },
            }
          : {}),
        ...(parsed.or
          ? {
              where: await this.getWhereInputFromOr(parsed.or),
            }
          : {}),
        ...(parsed.filter
          ? {
              where: await this.getWhereInputFromFilter(parsed.filter),
            }
          : {}),
        ...(parsed.search
          ? {
              where: await this.getWhereInputFromSearch(parsed.search),
            }
          : {}),
        ...(parsed.limit ? { take: parsed.limit } : {}),
        ...(isPaginated && parsed.offset ? { skip: parsed.offset } : {}),
      });
      if (isPaginated) {
        // @ts-ignore
        const total = await this.client.count();
        const { limit, offset } = parsed;
        const response: GetManyDefaultResponse<ModelType> = {
          data: result,
          count: result.length,
          total,
          page: limit ? Math.floor(offset / limit) + 1 : 1,
          pageCount: limit && total ? Math.ceil(total / limit) : 1,
        };
        return response;
      }
      return result;
    } catch (err) {
      if (
        err.toString().includes('Invalid') &&
        err.toString().includes('invocation:')
      ) {
        this.throwBadRequestException('Bad Request');
      }
      throw err;
    }
  }

  async getOne(req: CrudRequest): Promise<ModelType> {
    const userID = req.parsed.paramsFilter[0];
    try {
      // @ts-ignore
      const res = await this.client.findUnique({
        where: {
          id: userID.value,
        },
      });
      if (res === null) {
        this.throwNotFoundException(`${this.tableName}`);
      }
      return res;
    } catch (err) {
      this.throwBadRequestException('Bad Request');
      throw err;
    }
  }

  async createOne(_req: CrudRequest, dto: ModelType): Promise<ModelType> {
    try {
      // @ts-ignore
      const res = await this.client.create({
        data: dto,
      });
      return res;
    } catch (err) {
      if (
        err.toString().includes('Invalid') &&
        err.toString().includes('invocation:')
      ) {
        this.throwBadRequestException('Bad Request');
      }
      throw err;
    }
  }

  async createMany(
    _req: CrudRequest,
    dto: CreateManyDto
  ): Promise<ModelType[]> {
    return Promise.all(
      dto.bulk.map(async (item: any) => {
        let res;
        try {
          // @ts-ignore
          res = await this.client.create({
            data: item,
          });
          return res;
        } catch (err) {
          if (
            err.toString().includes('Invalid') &&
            err.toString().includes('invocation:')
          ) {
            this.throwBadRequestException('Bad Request');
          }
          throw err;
        }
      })
    );
  }

  async updateOne(req: CrudRequest, dto: ModelType): Promise<ModelType> {
    const userID = req.parsed.paramsFilter[0];
    let res;
    try {
      // @ts-ignore
      res = await this.client.update({
        where: {
          id: userID.value,
        },
        data: dto,
      });
      return res;
    } catch (err) {
      if (
        err.toString().includes('Invalid') &&
        err.toString().includes('invocation:')
      ) {
        this.throwBadRequestException('Bad Request');
      }
      return err;
    }
  }

  async replaceOne(_req: CrudRequest, _dto: ModelType): Promise<ModelType> {
    return {} as ModelType;
  }

  async deleteOne(req: CrudRequest): Promise<void | ModelType> {
    const userID = req.parsed.paramsFilter[0];
    try {
      // @ts-ignore
      const res = await this.client.delete({
        where: {
          id: userID.value,
        },
      });
      return res;
    } catch (err) {
      if (
        err.toString().includes('Invalid') &&
        err.toString().includes('invocation:')
      ) {
        this.throwBadRequestException('Bad Request');
      }
      return err;
    }
  }

  recoverOne(req: CrudRequest): Promise<void | ModelType> {
    throw new Error('Method not implemented.');
  }

  protected async getWhereInputFromFilter(
    filter: QueryFilter[]
  ): Promise<WhereInput> {
    return this.getWhereInputFromSearch({ $and: filter });
  }

  protected async getWhereInputFromOr(or: QueryFilter[]): Promise<WhereInput> {
    return this.getWhereInputFromSearch({ $or: or });
  }

  protected async getWhereInputFromSearch(
    search: SCondition
  ): Promise<WhereInput> {
    if (isObject(search)) {
      const keys = objKeys(search);
      if (keys.length) {
        if (isArrayFull(search.$and)) {
          return {
            AND: await Promise.all(
              (search.$and || []).map((searchItem: SCondition) =>
                this.getWhereInputFromSearch(searchItem)
              )
            ),
          };
        }
        if (isArrayFull(search.$or)) {
          if (Object.keys(search).length > 1) {
            return this.getWhereInputFromSearch({
              $and: [
                ...Object.entries(search).map(
                  ([key, searchItem]: [string, any]) => {
                    // TODO: need to look further
                    return { [key]: searchItem };
                  }
                ),
                { $or: search.$or },
              ],
            });
          }
          const result = {
            OR: await Promise.all(
              (search.$or || []).map((searchItem: SCondition) =>
                this.getWhereInputFromSearch(searchItem)
              )
            ),
          };
          return result;
        }
        const columns = await this.getColumns();
        let whereInput: WhereInput = {};
        await mapSeriesAsync(keys, async (field: string) => {
          const value = (search as HashMap)[field];
          if (field === 'q') {
            whereInput = await this.getWhereInputFromSearch({
              $or: Object.keys(columns).reduce(
                ($or: any[], columnKey: string) => {
                  const columnType = columns[columnKey];
                  if (columnType === ColumnType.String) {
                    $or.push({ [columnKey]: value });
                  }
                  return $or;
                },
                []
              ),
            });
            return;
          }
          if (isObject(value)) {
            const keysSet = new Set(Object.keys(value));
            if (keysSet.has('$and') || keysSet.has('$or')) {
              const operator = keysSet.has('$and') ? '$and' : '$or';
              whereInput[field] = await this.getWhereInputFromSearch(
                value[operator]
              );
              return;
            }
            let queryFilter: QueryFilter = value;
            if (
              typeof value.operator === 'undefined' ||
              typeof value.value === 'undefined' ||
              typeof value.field === 'undefined'
            ) {
              const key = Object.keys(value).find((key: string) =>
                this.operatorSet.has(key)
              );
              if (!key) {
                whereInput = {};
                return;
              }
              queryFilter = {
                field,
                operator: key as ComparisonOperator,
                value: value[key],
              };
            }
            whereInput[field] = this.getFilter(queryFilter);
            return;
          }
          whereInput[field] = this.getFilter({
            field,
            value,
            operator: '$eq',
          });
        });
        return whereInput;
      }
    }
    return {};
  }

  protected getFilter(queryFilter: QueryFilter): PrismaFilter {
    const operator =
      queryFilter.operator[0] === '$'
        ? queryFilter.operator
        : `$${queryFilter.operator}`;
    switch (operator) {
      case '$eq':
        return { equals: queryFilter.value };
      case '$ne':
        return { not: queryFilter.value };
      case '$gt':
        return { gt: queryFilter.value };
      case '$lt':
        return { lt: queryFilter.value };
      case '$gte':
        return { gte: queryFilter.value };
      case '$lte':
        return { lte: queryFilter.value };
      case '$starts':
        return { startsWith: queryFilter.value };
      case '$ends':
        return { endsWith: queryFilter.value };
      case '$cont':
        return { contains: queryFilter.value };
      case '$excl':
        return {};
      case '$in':
        return { in: queryFilter.value };
      case '$notin':
        return { notIn: queryFilter.value };
      case '$isnull':
        return {};
      case '$notnull':
        return {};
      case '$between':
        return {};
      case '$eqL':
        return {};
      case '$neL':
        return {};
      case '$startsL':
        return {};
      case '$endsL':
        return {};
      case '$contL':
        return {};
      case '$exclL':
        return {};
      case '$inL':
        return {};
      case '$notinL':
        return {};
      default:
        return {};
    }
  }

  protected operatorSet = new Set([
    '$eq',
    '$ne',
    '$cont',
    '$gt',
    '$lt',
    '$gte',
    '$lte',
    '$starts',
    '$ends',
    '$in',
    '$notin',
    '$excl',
    '$isnull',
    '$notnull',
    '$between',
    '$eqL',
    '$neL',
    '$startsL',
    '$endsL',
    '$contL',
    '$exclL',
    '$inL',
    '$notinL',
    'eq',
    'ne',
    'cont',
    'gt',
    'lt',
    'gte',
    'lte',
    'starts',
    'ends',
    'in',
    'notin',
    'excl',
    'isnull',
    'notnull',
    'between',
    'eqL',
    'neL',
    'startsL',
    'endsL',
    'contL',
    'exclL',
    'inL',
    'notinL',
  ]);
}
