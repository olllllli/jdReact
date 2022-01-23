// TODO: probably convert this to a namespace
export namespace API {
    const BASEURL = "https://jdapi.olll.li";
    export const ROUTES = {
        /* meta */
        lastUpdated: "/meta/lastupdated",
        uuid: "/uuid",
        /* data */
        advancements: "/advancements",
        player: "/player",
        stats: "/stats",
    }

    // NOTE: These are treated like namespaces
    // TODO: Type annotate and deal with the error responses. Raise on errors and dont return anything.
    /* last updated on remote endpoint */
    export const lastUpdated: metaEndpoint<timestampFull | null> = {
        async get() {
            const res = await fetch(BASEURL + ROUTES.lastUpdated);
            if (!res.ok) {
                return null;
            }
            const data = await res.text();
            return data;
        }
    }

    /* uuid list endpoint */
    export const UUIDList: metaEndpoint<uuid[] | null> = {
        async get() {
            const res = await fetch(BASEURL + ROUTES.uuid);
            if (!res.ok) {
                return null;
            }
            const data = await res.json();
            return data;
        }
    }

    /* advancements endpoint */
    export const advancements: dataEndpoint<advancementsData | null> = {
        async get(uuid) {
            const res = await fetch(BASEURL + ROUTES.advancements + "/" + uuid);
            if (!res.ok) {
                return null;
            }
            const data = await res.json();
            return data;
        }
    }

    /* player endpoint */
    export const player: dataEndpoint<playerData | null> = {
        async get(uuid) {
            const res = await fetch(BASEURL + ROUTES.player + "/" + uuid);
            if (!res.ok) {
                return null;
            }
            const data = await res.json();
            return data;
        }
    }

    /* advancements endpoint */
    export const stats: dataEndpoint<statsData | null> = {
        async get(uuid) {
            const res = await fetch(BASEURL + ROUTES.stats + "/" + uuid);
            if (!res.ok) {
                return null;
            }
            const data = await res.json();
            return data;
        }
    }
}