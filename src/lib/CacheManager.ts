import { API } from "lib/API";

/** 
 * Caching Model:
 *  - On page load, fetch last updated timestamp
 *  - When data for a certain player is needed:
 *    - Check if its stored in the object, if not
 *    - Check the age of the locally stored player's data
 *    - Fetch if needed, otherwise grab locally stored
 * 
 *  - Data for data routes is cached like:
 *      ROUTE:uuid -> { lastUpdated: timestampFull, data: data }
 *  - Data for meta routes is cached like:
 *      ROUTE -> { lastUpdated: timestampFull, data }
 */

// TODO: possibly add uuid to username array here

export class CacheManager {
    // in memory storage, if it's in here, its up to date.
    private storage: CacheManagerStorage;

    constructor() {
        console.info("CacheManager: constructor() called.");
        // initialise the storage
        this.storage = {
            lastUpdated: null,
            UUIDList: null,
            advancements: new Map<uuid, advancementsData>(),
            players: new Map<uuid, playerData>(),
            stats: new Map<uuid, statsData>()
        };
    }

    /* Initialises the cache, should be called before anything else */
    async init() {
        console.info("CacheManager: init() called.");
        if (!this.storage.lastUpdated) {
            await this.getLastUpdated();
        }
    }

    /* Gets data from the localStorage if its upto date, otherwise returns null */
    // TODO: Might want to simplify the type signature to make it more readable.
    // NOTE: All it means is the type of the key determines the type of the stored data
    private async getLocalStorage<K extends localStorageKey>(key: K): Promise<localStorageData<K> | null> {
        // get the remote date
        const remoteAge = new Date(await this.getLastUpdated());

        // get the local storage data, 
        let storedData = window.localStorage.getItem(key);
        if (storedData) {
            // there was data in the local storage, check its date
            const parsed: localStorageValue<K> = JSON.parse(storedData);
            const localAge = new Date(parsed["lastUpdated"]);
            if (localAge >= remoteAge) {
                // is upto date, return the localStorage data
                return parsed["data"];
            }
        }

        // was not in localstorage or not up to date
        return null;
    }

    /* Puts data into the localStorage */
    private async putLocalStorage<K extends localStorageKey>(key: K, data: localStorageData<K>) {
        // get the updated time
        const timestamp = await this.getLastUpdated();
        const dataToBeStored: localStorageValue<K> = {
            lastUpdated: timestamp,
            data: data
        };

        // store the data
        window.localStorage.setItem(key, JSON.stringify(dataToBeStored));
    }

    /* Returns a timestamp of the last time the remote storage was updated. This is never cached in localstorage, only on the object. */
    async getLastUpdated(): Promise<timestampFull> {
        let timestamp = this.storage.lastUpdated;
        if (!timestamp) {
            // wasnt in object storage
            timestamp = await API.lastUpdated.get();
            if (!timestamp) {
                throw new Error("getLastUpdated: API Error.");
            }
            this.storage.lastUpdated = timestamp;
        }
        return timestamp;
    }

    // TODO: Handle errors in these
    /* Metadata getters */

    /* Returns a list of uuids. */
    async getUUIDs(): Promise<uuid[]> {
        let objectData = this.storage.UUIDList;
        if (objectData) {
            // was on the object, return
            return objectData;
        }

        // check local storage
        const localData = await this.getLocalStorage("UUIDList");
        if (localData) {
            return localData;
        }

        // no entry in localstorage, or was not upto date, query the api
        const APIData = await API.UUIDList.get();
        if (!APIData) {
            throw new Error("getUUIDs: API Error.");
        }
        this.storage.UUIDList = APIData;
        await this.putLocalStorage("UUIDList", APIData);
        return APIData;
    }

    /* Returns a map of uuids to usernames, via getUUIDs and getPlayer. Makes the calls in parallel */
    async getUUIDMap(): Promise<Map<uuid, string>> {
        const uuids = await this.getUUIDs();
        const mapping = new Map<uuid, string>();

        // the function which adds it to the map, passing the cache because i hate `this`
        async function getUsername(cache: CacheManager, uuid: uuid) {
            const data = await cache.getPlayer(uuid);
            const username = data.username;
            mapping.set(uuid, username);
            return uuid;
        }

        // TODO: Possibly add a series version
        // get all the usernames and add them to the mapping in parallel
        await Promise.all(uuids.map((uuid) => {
            return getUsername(this, uuid);
        }));
        // TODO: Sort by username

        return mapping;
    }

    /* Real data getters, all of these effectively function the same */

    /* Returns the advancement data for a user. */
    async getAdvancements(uuid: uuid): Promise<advancementsData> {
        const objectData = this.storage.advancements.get(uuid);
        if (objectData) {
            // was on the object, return
            return objectData;
        }

        // check local storage since it wasnt on the object
        const localData = await this.getLocalStorage(`advancements:${uuid}`);
        if (localData) {
            return localData;
        }

        // not in local storage or was not up to date
        const APIData = await API.advancements.get(uuid);
        if (!APIData) {
            throw new Error("getAdvancements: API Error.");
        }
        this.storage.advancements.set(uuid, APIData);
        await this.putLocalStorage(`advancements:${uuid}`, APIData);
        return APIData;
    }

    /* Returns the player data for a user. */
    async getPlayer(uuid: uuid): Promise<playerData> {
        const objectData = this.storage.players.get(uuid);
        if (objectData) {
            // was on the object, return
            return objectData;
        }

        // check local storage since it wasnt on the object
        const localData = await this.getLocalStorage(`player:${uuid}`);
        if (localData) {
            return localData;
        }

        // not in local storage or was not up to date
        const APIData = await API.player.get(uuid);
        if (!APIData) {
            throw new Error("getPlayer: API Error.");
        }
        this.storage.players.set(uuid, APIData);
        await this.putLocalStorage(`player:${uuid}`, APIData);
        return APIData;
    }

    /* Returns the stats data for a user. */
    async getStats(uuid: uuid): Promise<statsData> {
        const objectData = this.storage.stats.get(uuid);
        if (objectData) {
            // was on the object, return
            return objectData;
        }

        // check local storage since it wasnt on the object
        const localData = await this.getLocalStorage(`stats:${uuid}`);
        if (localData) {
            return localData;
        }

        // not in local storage or was not up to date
        const APIData = await API.stats.get(uuid);
        if (!APIData) {
            throw new Error("getStats: API Error.");
        }
        this.storage.stats.set(uuid, APIData);
        await this.putLocalStorage(`stats:${uuid}`, APIData);
        return APIData;
    }
}