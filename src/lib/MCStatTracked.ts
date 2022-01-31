/* The map of statistics that the StatsPage will display */
type StatNameFull = `${statsNamespaces}/${string}`;

type TrackedStatType = {
    display: string; // The value displayed in the option
} & (
        | { // for simple stats that have no formatter, or a known formatter
            type: "simple";
            stat: StatNameFull;
        } | { // for fake stats that are comprised of multiple stats
            type: "composite";
            stats: StatNameFull[];
            formatter: (...rawValues: number[]) => number;
        }
    );

const trackedStats = new Map<string, TrackedStatType>([
    ["playtime", { display: "Time Played (hrs)", type: "simple", stat: "minecraft:custom/minecraft:play_time" }],
    ["gamesleft", { display: "Times Exitted Server", type: "simple", stat: "minecraft:custom/minecraft:leave_game" }],
    ["flown", { display: "Distance Flown (km)", type: "simple", stat: "minecraft:custom/minecraft:fly_one_cm" }],
    ["walked", { display: "Distance Walked (km)", type: "simple", stat: "minecraft:custom/minecraft:walk_one_cm" }],
    ["ran", { display: "Distance Ran (km)", type: "simple", stat: "minecraft:custom/minecraft:sprint_one_cm" }],
    ["boated", { display: "Distance Boated (km)", type: "simple", stat: "minecraft:custom/minecraft:boat_one_cm" }],
    ["carted", { display: "Distance Minecarted (km)", type: "simple", stat: "minecraft:custom/minecraft:minecart_one_cm" }],
    ["jumped", { display: "Times Jumped", type: "simple", stat: "minecraft:custom/minecraft:jump" }],
    ["kd", {
        display: "Player K/D",
        type: "composite",
        stats: ["minecraft:custom/minecraft:player_kills", "minecraft:killed_by/minecraft:player"],
        formatter: (kills, deaths) => (kills / (deaths ? deaths : -1)),
    }],
    ["mobskilled", { display: "Mobs Killed", type: "simple", stat: "minecraft:custom/minecraft:mob_kills" }],
    ["killshulker", { display: "Shulkers Killed", type: "simple", stat: "minecraft:killed/minecraft:shulker" }],
    ["anviluses", { display: "Anvil Interactions", type: "simple", stat: "minecraft:custom/minecraft:interact_with_anvil" }],
    ["diamonds", {
        display: "Diamond Ore Mined",
        type: "composite",
        stats: ["minecraft:mined/minecraft:diamond_ore", "minecraft:used/minecraft:diamond_ore"],
        formatter: (broken, used) => (broken - used),
    }],
    ["debris", {
        display: "Ancient Debris Mined",
        type: "composite",
        stats: ["minecraft:mined/minecraft:ancient_debris", "minecraft:used/minecraft:ancient_debris"],
        formatter: (broken, used) => (broken - used),
    }],
    ["trades", { display: "Trades with Villagers", type: "simple", stat: "minecraft:custom/minecraft:traded_with_villager" }],
    ["coolness", {
        display: "Coolness Level",
        type: "composite",
        stats: ["minecraft:killed/minecraft:wither", "minecraft:killed/minecraft:ender_dragon"],
        formatter: (withers, dragons) => ((1 + withers) * (1 + (5 * dragons))),
    }]
]);

export default trackedStats;