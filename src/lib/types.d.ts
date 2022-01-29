// TODO: build this type accordingly; https://minecraft.fandom.com/wiki/Universally_unique_identifier
/* Basic types */
type digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type hex = digit | "a" | "b" | "c" | "d" | "e" | "f";
type uuid = string;
type timestampBasic = string;
type timestampFull = string;

/* Response data types */
type advancementNamespace = `minecraft:${AdvCategory}/${string}`;
type advancementsData = { DataVersion: number } & {
    [namespace: advancementNamespace]: {
        criteria: {
            [criterion: string]: timestampBasic;
        };
        done: boolean;
    };
};

type playerData = {
    advancementCount: number | string;
    offline: boolean;
    skin: string; // A URL
    username: string;
};

type statsNamespaces = `minecraft:${"broken" | "crafted" | "custom" | "dropped" | "killed" | "killed_by" | "mined" | "picked_up" | "used"}`;
type statsData = { DataVersion: number } & {
    [namespace in statsNamespaces]: {
        [stat: string]: number;
    };
};

/* endpoint interfaces */
interface metaEndpoint<R> {
    get(): Promise<R>;
}

interface dataEndpoint<R> {
    get(uuid: string): Promise<R>;
}

/* types for the cache manager */
type CacheManagerStorage = {
    lastUpdated: string | null;
    UUIDList: uuid[] | null;
    advancements: Map<uuid, advancementsData>;
    players: Map<uuid, playerData>;
    stats: Map<uuid, statsData>;
};

// TODO: Potentially use this less complicated form that raises errors and just use `as`
// type localStorageKeyType = "UUIDList" | "advancements" | "player" | "stats";

// type localStorageValueType = {
//     lastUpdated: timestampFull,
//     data: advancementsData | playerData | statsData | uuid[]
// }

// NOTE: All this is saying is it determines the data type based on the type of the key (category of the data)
type localStorageData<T> = T extends "UUIDList" ? uuid[] : T extends `advancements:${uuid}` ? advancementsData : T extends `player:${uuid}` ? playerData : T extends `stats:${uuid}` ? statsData : never;

type localStorageKey = "UUIDList" | `advancements:${uuid}` | `player:${uuid}` | `stats:${uuid}`;

type localStorageValue<KeyType> = {
    lastUpdated: timestampFull;
    data: localStorageData<KeyType>;
};

/**
 * TYPES RELEVANT TO THE REACT COMPONENTS
 */

/* Advancements */
type AdvCategory = "story" | "nether" | "end" | "adventure" | "husbandry";
type AdvType = "normal" | "goal" | "challenge";

type AdvancementDetailsType = {
    [category in AdvCategory]: {
        [name: string]: {
            title: string;
            desc: string;
            icon: { type: "item" | "block"; name: string; ench: boolean };
            type: AdvType;
            criteria: string[];
        };
    };
};

type AdvancementLayoutType = {
    [category in AdvCategory]: {
        [name: string]: {
            row: number;
            col: number;
            children: string[];
        };
    };
};
