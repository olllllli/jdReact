/* Contains the older names of stats, with dataversion that name was first introduced */
type StatNamesType = {
    [namespace in statsNamespaces]: {
        [stat: string]: {
            [firstDataversion: number]: string;
        };
    }
};

// TODO: deal with late introduced stats here aswell
const statNames: StatNamesType = {
    "minecraft:custom": {
        "minecraft:play_time": {
            2711: "minecraft:play_time",
            0: "minecraft:play_one_minute"
        }
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

/* extracts a raw stat using the above mapping aswell, no formatting, returns null if can't find it */
function extractRawStat(namespace: string, stat: string, data: statsData): number | null {
    // check namespace
    if (!(namespace in data.stats)) {
        return null;
    }

    // get the dated name of the advancement just incase of renames
    if (stat in statNames[namespace as statsNamespaces]) {
        const versions = statNames[namespace as statsNamespaces][stat];
        for (const version of Object.keys(versions)) {
            if (data.DataVersion >= Number(version)) {
                // found the entry for the needed data version
                stat = versions[Number(version)];
            }
        }
    }

    // check stat
    if (!(stat in data.stats[namespace as statsNamespaces])) {
        return null;
    }

    return data.stats[namespace as statsNamespaces][stat];
}

export default extractRawStat;