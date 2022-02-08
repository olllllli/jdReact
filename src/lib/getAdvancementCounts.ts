import { advancementLayouts } from "./MCAdvLayouts";
const categories: AdvCategory[] = ["story", "nether", "end", "adventure", "husbandry"];

/* Returns the advancement completion counts for each category */
export default function getAdvancementCounts(data: advancementsData): AllCountsType {
    const res: AllCountsType = {
        "story": { completed: 0, total: 0 },
        "nether": { completed: 0, total: 0 },
        "end": { completed: 0, total: 0 },
        "adventure": { completed: 0, total: 0 },
        "husbandry": { completed: 0, total: 0 },
    };

    for (const category of categories) {
        for (const advName in advancementLayouts[category]) {
            // go through each advancement of each category
            const advNamespace: advancementNamespace = `minecraft:${category}/${advName}`;
            const advDone = data[advNamespace] ? data[advNamespace].done : false;

            res[category].total += 1;
            if (advDone) {
                res[category].completed += 1;
            }
        }
    }

    return res;
}

type CountType = { completed: number; total: number; };
type AllCountsType = { [category in AdvCategory]: CountType };