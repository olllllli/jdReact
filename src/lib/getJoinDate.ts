const categories: AdvCategory[] = ["story", "nether", "end", "adventure", "husbandry"];

/* Returns the rough join date of a player based on their first advancement */
export default function getJoinDate(data: advancementsData): Date {
    let oldest = Date.now();
    for (const namespace in data) {
        if (namespace === "DataVersion") {
            continue;
        }

        // go through each criterion's date of the advancement
        for (const date of Object.values(data[namespace as advancementNamespace].criteria)) {
            const criterionDate = new Date(date);

            // set oldest to the smaller of the two
            oldest = Math.min(oldest, criterionDate.getTime());
        }
    }
    return new Date(oldest);
}