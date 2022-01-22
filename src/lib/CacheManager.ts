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

export class CacheManager {
    // in memory storage, if it's in here, its up to date.
    private storage: CacheManagerStorage;

    constructor() {
        console.log("new cache manager");
        // initialise the storage
        this.storage = {
            lastUpdated: null,
            UUIDList: null,
            advancements: new Map<uuid, advancementsData>(),
            players: new Map<uuid, playerData>(),
            stats: new Map<uuid, statsData>()
        }

        // populate the last updated
        this.getLastUpdated();
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
        }

        // store the data
        window.localStorage.setItem(key, JSON.stringify(dataToBeStored));
    }

    /* Returns a timestamp of the last time the remote storage was updated. This is never cached in localstorage, only on the object. */
    async getLastUpdated(): Promise<timestampFull> {
        let timestamp = this.storage.lastUpdated;
        if (!timestamp) {
            // wasnt in object storage
            timestamp = await API.lastUpdated.get();
            this.storage.lastUpdated = timestamp;
        }
        return timestamp;
    }

    /* Returns a list of uuids. */
    async getUUIDs(): Promise<uuid[]> {
        let uuids = this.storage.UUIDList;
        if (uuids) {
            // was on the object, return
            console.log("uuids was on object");
            return uuids;
        }

        // check local storage first
        const localData = await this.getLocalStorage("UUIDList");
        if (localData) {
            console.log("uuids was in localstorage");
            return localData;
        }

        // no entry in localstorage, or was not upto date, query the api
        uuids = await API.UUIDList.get();
        this.storage.UUIDList = uuids;
        this.putLocalStorage("UUIDList", uuids);
        console.log("fetched uuids");
        return uuids;
    }
}