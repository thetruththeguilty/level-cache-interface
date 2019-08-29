import levelup from 'levelup'
import leveldown from 'leveldown'
import { IOptions, IValueWrapper, createCache } from 'cache-creator'
 
export interface ILevelDB {
  get: (key: string) => Promise<string>
  put: (key: string, value: string) => void
}

export let levelCacheInterface: IOptions<ILevelDB, any> = {
  getter: async (storage, key) => {
    let res = await storage.get(key)
      .catch(() => undefined)
    if (!res) return undefined
    let value = JSON.parse(res)
    return value as IValueWrapper<any>
  },
  setter: async (storage, key, value) => {
    await storage.put(key, JSON.stringify(value))
    return value
  }
}

export function createLevelCache (levelDb: ILevelDB) {
  return createCache(levelDb, levelCacheInterface)
}