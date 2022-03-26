import {
  generateClientLib,
  IGenerateReactQueryProps,
} from '@nest4next/generate-client-lib';
import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerModule,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { writeJson } from 'fs-extra';
import { basename } from 'path';

export const baseApiDocs = () => {
  return new DocumentBuilder().setVersion(
    process.env['npm_package_version'] || '0.0.0'
  );
};

export const genSwaggerAndClientLibs = async (
  app: INestApplication,
  config: Omit<OpenAPIObject, 'paths'> & { paths?: OpenAPIObject['paths'] },
  options: GenSwaggerAndClientLibsConfig
) => {
  options.clientLibConfig.schemas ||= options.clientLibConfig.path.replace(
    basename(options.clientLibConfig.path),
    'models'
  );
  const document = SwaggerModule.createDocument(
    app,
    config,
    options.swaggerOpts
  );

  if (options.debugSchema) {
    await writeJson(options.debugSchema, document);
  }

  await generateClientLib(document, options.clientLibConfig);

  return document;
};

export interface GenSwaggerAndClientLibsConfig {
  clientLibConfig: IGenerateReactQueryProps;
  swaggerOpts?: SwaggerDocumentOptions;
  debugSchema?: string;
}
