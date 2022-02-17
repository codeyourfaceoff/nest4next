import { OpenAPIObject } from '@nestjs/swagger';
import { generate } from 'orval';
import type { Options as SwaggerOptions } from '@apidevtools/swagger-parser';
import { rm, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { resolve } from 'path';

export async function generateClientLib(
  document: OpenAPIObject,
  props: IGenerateReactQueryProps
) {
  const tmpPath = resolve(tmpdir(), 'docs.json');
  await writeFile(tmpPath, JSON.stringify(document), 'utf8');

  await generate({
    output: {
      target: props.path,
      client: props.client,
      mode: props.mode,
      schemas: props.schemas,
      workspace: props.workspace,
      mock: props.mock,
      clean: props.clean,
      prettier: props.prettier,
      tsconfig: props.tsconfig,
      override: props.outputOverride,
    },
    input: {
      target: tmpPath,
      parserOptions: props.parser,
      validation: props.validation,
      converterOptions: props.converterOptions,
      override: props.inputOverride,
    },
  });

  await rm(tmpPath);
}

// Using 'any' here due to the fact that we can't extend the options from orval
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Override = any;

export type IGenerateReactQueryProps = {
  path: string;
  schemas?: string;
  workspace?: string;
  mock?: boolean;
  clean?: boolean | string[];
  prettier?: boolean;
  tsconfig?: string;
  outputOverride?: Override;
  inputOverride?: Override;
  /**
   * @default 'single'
   */
  mode?: 'single' | 'split' | 'tags' | 'tags-split';
  client:
    | 'axios'
    | 'axios-functions'
    | 'angular'
    | 'react-query'
    | 'svelte-query'
    | 'vue-query';

  validation?: boolean;
  converterOptions?: boolean;
  parser?: SwaggerParserOptions;
};

export type SwaggerParserOptions = Omit<SwaggerOptions, 'validate'> & {
  validate?: boolean;
};
