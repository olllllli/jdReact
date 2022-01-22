import { CacheManager } from "lib/CacheManager";
import { atom } from "recoil";

// TODO: Work out how to not need mutability here, I dont think I should be using this to store the cache manager tbh. 
export const cacheState = atom<CacheManager>({
    key: "cacheState",
    default: new CacheManager(),
    dangerouslyAllowMutability: true
});