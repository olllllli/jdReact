// TODO: build this type accordingly; https://minecraft.fandom.com/wiki/Universally_unique_identifier
/* Basic types */
type digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type hex = digit | "a" | "b" | "c" | "d" | "e" | "f";
type uuid = string;
type timestampBasic = string;
type timestampFull = string;

/* Response data types */
type advancementNamespace = `minecraft:${AdvCategory}/${string}`;
type advancementsData = { DataVersion: number; } & {
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
type statsData = { DataVersion: number; } & {
    "stats": {
        [namespace in statsNamespaces]: {
            [stat: string]: number;
        };
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
            icon: { type: "item" | "block"; name: string; ench: boolean; };
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

/**
 * TYPES RELEVANT TO MCRENDER
 */
const directions = ["up", "down", "north", "south", "east", "west"] as const;
type Direction = typeof directions[number];

// TODO: only have known resource locations
type ImageOrUndefined = HTMLImageElement | undefined;
type ResourceLocationTypeTrimmed = `block/${string}`;
type ResourceLocationType = `${"minecraft:" | ""}block/${"minecraft:" | ""}${string}`;
type TextureVariableType = `#${string}`;
type TextureData<T> = { [textureVariable: string]: T; };
type ResourceData = TextureData<ResourceLocationType | TextureVariableType>;
type FaceDataType = {
    texture: TextureVariableType;
    uv?: [number, number, number, number];
    cullface?: Direction; // "bottom may also be used in the latest versions instead of down, despite appearing only once." wtf
    rotation?: 0 | 90 | 180 | 270;
    tintindex?: number; // wild times we live in
};

type ElementDataType = {
    from: [number, number, number];
    to: [number, number, number];
    faces: SideData<FaceDataType>;
    rotation?: unknown; // TODO: Type this
    shade?: boolean; // default true
};

// https://minecraft.fandom.com/wiki/Model#Block_models
type BlockModelDataType = {
    parent: ResourceLocationType; // should be defined on everything except from `block/block`
    ambientocclusion?: boolean; // default true // NOTE: actually use this
    display?: unknown; // NOTE: use this if certain things are wrong rotation
    textures?: ResourceData; // NOTE: Could type this better 
    elements?: ElementDataType[];
};

// parent datatypes
type SideData<T> = { [side in Direction]?: T; };
// moved rest to MCRenderParents.ts