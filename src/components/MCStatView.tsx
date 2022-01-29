import { cache } from "index";
import extractRawStat from "lib/MCStatExtractor";
import formatStat from "lib/MCStatFormatter";
import React from "react";
import { FunctionComponent, useEffect, useState } from "react";

import "styles/components/MCStatView.scss";
import MCStat from "./MCStat";


type stateData = {
    player: Map<uuid, playerData>;
    stats: Map<uuid, statsData>;
};

// extracts a stat from the stats data, formatted by the given formatter or known formatter
function extractStat(props: MCStatViewProps, data: statsData): number {
    // determine whether simple or composite
    if (props.type === "simple") {
        // simple type
        const [namespace, stat] = props.statName.split("/");
        if (!namespace || !stat) {
            return -1;
        }

        // extract the raw stat
        const rawData = extractRawStat(namespace as statsNamespaces, stat, data);
        if (!rawData) {
            return -1;
        }

        return formatStat(namespace as statsNamespaces, stat, rawData);

    } else {
        // composite type
        // get each stats raw data
        const rawDatas: number[] = [];
        for (const statName of props.statNames) {
            const [namespace, stat] = statName.split("/");
            if (!namespace || !stat) {
                rawDatas.push(-1);
            }
            rawDatas.push(extractRawStat(namespace as statsNamespaces, stat, data) ?? -1);
        }

        // return the formatted
        return props.formatter(...rawDatas) ?? -1;
    }
}



/* A component that displays all users for a specific stat */
type StatNameFull = `${statsNamespaces}/${string}`;
type MCStatViewProps = {
    type: "simple";
    statName: StatNameFull;
} | {
    type: "composite";
    statNames: StatNameFull[];
    formatter: (...args: number[]) => number;
};

const MCStatView: FunctionComponent<MCStatViewProps> = (props) => {
    // get all the player and stats, store it in state
    // NOTE: Potientially useRef here? although its supposidly bad practise
    const [data, setData] = useState<stateData | undefined>(undefined);
    useEffect(() => {
        async function getData() {
            // TODO: handle errors
            const playerData = await cache.getPlayerAll();
            const statsData = await cache.getStatsAll();
            setData({
                player: playerData,
                stats: statsData,
            });
        }

        getData();
    }, []);

    // return a loading state until all the data is gotten
    if (!data) {
        return (
            <div className="MCStatView loading">
                <div className="loadingIcon" />
                <span>Loading...</span>
            </div>
        );
    }

    // get the specific stat for each player and create the element
    const statComponents: React.FunctionComponentElement<{ player: playerData; displayedValue: number; }>[] = [];
    data.player.forEach((playerData, uuid) => {
        const value = extractStat(props, data.stats.get(uuid)!);
        statComponents.push(
            <MCStat player={playerData} displayedValue={value} key={uuid} />
        );
    });

    // sort the components // NOTE: Might be unsafe, could just store the details in props objects first then sort normally
    statComponents.sort((a, b) => {
        return b.props.displayedValue - a.props.displayedValue;
    });

    return (
        <div className="MCStatView loaded">
            {statComponents}
        </div>
    );

};

export default MCStatView;