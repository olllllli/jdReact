/* Formatters for known stats, only really relevant for some minecraft:custom */
// TODO: Allow string returns
type statFormattersType = {
    [namespace in statsNamespaces]: {
        [stat: string]: (raw: number) => number;
    }
};

const statFormatters: statFormattersType = {
    "minecraft:custom": {
        "minecraft:play_time": (raw) => (raw / 72000),
        "minecraft:fly_one_cm": (raw) => (raw / 100 / 1000),
        "minecraft:walk_one_cm": (raw) => (raw / 100 / 1000),
        "minecraft:sprint_one_cm": (raw) => (raw / 100 / 1000),
        "minecraft:boat_one_cm": (raw) => (raw / 100 / 1000),
        "minecraft:minecart_one_cm": (raw) => (raw / 100 / 1000),
    },
    "minecraft:mined": {},
    "minecraft:broken": {},
    "minecraft:crafted": {},
    "minecraft:used": {},
    "minecraft:picked_up": {},
    "minecraft:dropped": {},
    "minecraft:killed": {},
    "minecraft:killed_by": {},
};

/* Formats a stat using the above formatters */
function formatStat(namespace: statsNamespaces, stat: string, raw: number): number {
    if (!(stat in statFormatters[namespace])) {
        return raw; // no known formatter
    }

    return statFormatters[namespace][stat](raw);
}

export default formatStat;