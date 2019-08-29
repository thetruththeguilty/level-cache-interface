import { IOptions } from 'cache-creator';
export interface ILevelDB {
    get: (key: string) => Promise<string>;
    put: (key: string, value: string) => Promise<void>;
}
export declare let levelCacheInterface: IOptions<ILevelDB, any>;
export declare function createLevelCache(levelDb: ILevelDB): import("cache-creator").ICache<any>;
