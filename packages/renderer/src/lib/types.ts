import { EDirent } from '@lib/types';

export interface fsApi {
  readDirectory: (dirPath: string) => Promise<EDirent[]>;
}

export interface pathApi {
  join: (...paths: string[]) => Promise<string>;
}
