import { IOptions, IValueWrapper } from 'cache-creator';
export interface ILevelDB {
    get: (key: string) => Promise<string>;
    put: (key: string, value: string) => void;
}
export declare let levelCacheInterface: IOptions<ILevelDB, any>;
export declare function createLevelCache(levelDb: ILevelDB): {
    applyWith: (name: string, func: Function, ttl: number, params: any[]) => Promise<any>;
    wrapperWithCall: (name: string, func: Function, ttl: number) => (...params: any[]) => Promise<any>;
    cleanUp: (ttl: number) => Promise<boolean>;
    save: (key: string, value: any, ttl?: number) => Promise<IValueWrapper<any>>;
    load: (key: string, ttl?: number) => Promise<any>;
};
