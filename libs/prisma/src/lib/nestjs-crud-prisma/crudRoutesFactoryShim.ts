/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BaseRouteName } from '@nestjsx/crud/lib/types';
import { CrudActions } from '@nestjsx/crud/lib/enums';
import { CrudOptions, BaseRoute } from '@nestjsx/crud/lib/interfaces';
import { CrudRoutesFactory } from '@nestjsx/crud/lib/crud/crud-routes.factory';

// @ts-ignore
export default class CrudRoutesFactoryShim extends CrudRoutesFactory {
  constructor(target: any, options: CrudOptions) {
    super(target, options);
  }

  protected override get targetProto(): any {
    // @ts-ignore
    return super.targetProto;
  }

  protected override get modelName(): string {
    // @ts-ignore
    return super.modelName;
  }

  protected override get modelType(): any {
    // @ts-ignore
    return super.modelType;
  }

  protected override get actionsMap(): { [key in BaseRouteName]: CrudActions } {
    // @ts-ignore
    return super.actionsMap;
  }

  protected override create() {
    // @ts-ignore
    return super.create();
  }

  protected override mergeOptions() {
    // @ts-ignore
    return super.mergeOptions();
  }

  protected override getRoutesSchema(): BaseRoute[] {
    // @ts-ignore
    return super.getRoutesSchema();
  }

  protected override getManyBase(name: BaseRouteName) {
    // @ts-ignore
    return super.getManyBase(name);
  }

  protected override getOneBase(name: BaseRouteName) {
    // @ts-ignore
    return super.getOneBase(name);
  }

  protected override createOneBase(name: BaseRouteName) {
    // @ts-ignore
    return super.createOneBase(name);
  }

  protected override createManyBase(name: BaseRouteName) {
    // @ts-ignore
    return super.createManyBase(name);
  }

  protected override updateOneBase(name: BaseRouteName) {
    // @ts-ignore
    return super.updateOneBase(name);
  }

  protected override replaceOneBase(name: BaseRouteName) {
    // @ts-ignore
    return super.replaceOneBase(name);
  }

  protected override deleteOneBase(name: BaseRouteName) {
    // @ts-ignore
    return super.deleteOneBase(name);
  }

  protected override canCreateRoute(name: string) {
    // @ts-ignore
    return super.canCreateRoute(name);
  }

  protected override setResponseModels() {
    // @ts-ignore
    return super.setResponseModels();
  }

  protected override createRoutes(routesSchema: BaseRoute[]) {
    // @ts-ignore
    return super.createRoutes(routesSchema);
  }

  protected override overrideRoutes(routesSchema: BaseRoute[]) {
    // @ts-ignore
    return super.overrideRoutes(routesSchema);
  }

  protected override enableRoutes(routesSchema: BaseRoute[]) {
    // @ts-ignore
    return super.enableRoutes(routesSchema);
  }

  protected override overrideParsedBodyDecorator(
    override: BaseRouteName,
    name: string
  ) {
    // @ts-ignore
    return super.overrideParsedBodyDecorator(override, name);
  }

  protected override getPrimaryParams(): string[] {
    // @ts-ignore
    return super.getPrimaryParams();
  }

  protected override setBaseRouteMeta(name: BaseRouteName) {
    // @ts-ignore
    return super.setBaseRouteMeta(name);
  }

  protected override setRouteArgs(name: BaseRouteName) {
    // @ts-ignore
    return super.setRouteArgs(name);
  }

  protected override setRouteArgsTypes(name: BaseRouteName) {
    // @ts-ignore
    return super.setRouteArgsTypes(name);
  }

  protected override setInterceptors(name: BaseRouteName) {
    // @ts-ignore
    return super.setInterceptors(name);
  }

  protected override setDecorators(name: BaseRouteName) {
    // @ts-ignore
    return super.setDecorators(name);
  }

  protected override setAction(name: BaseRouteName) {
    // @ts-ignore
    return super.setAction(name);
  }

  protected override setSwaggerOperation(name: BaseRouteName) {
    // @ts-ignore
    return super.setSwaggerOperation(name);
  }

  protected override setSwaggerPathParams(name: BaseRouteName) {
    // @ts-ignore
    return super.setSwaggerPathParams(name);
  }

  protected override setSwaggerQueryParams(name: BaseRouteName) {
    // @ts-ignore
    return super.setSwaggerQueryParams(name);
  }

  protected override setSwaggerResponseOk(name: BaseRouteName) {
    // @ts-ignore
    return super.setSwaggerResponseOk(name);
  }

  protected override routeNameAction(name: BaseRouteName): string {
    // @ts-ignore
    return super.routeNameAction(name);
  }
}
