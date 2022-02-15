import { OpenAPIObject } from '@nestjs/swagger';
import { generate } from 'orval';
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
    },
    input: {
      target: tmpPath,
    },
  });

  await rm(tmpPath);
}

export interface IGenerateReactQueryProps {
  path: string;
  client:
    | 'axios'
    | 'axios-functions'
    | 'angular'
    | 'react-query'
    | 'svelte-query'
    | 'vue-query';
}
