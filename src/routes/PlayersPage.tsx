import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "styles/routes/common.scss";
import "styles/gui.scss";
import MCPlayerCardContainer from "components/MCPlayerCardContainer";
import LoadingPage from "./LoadingPage";
import { cache } from "index";

const PlayersPage: FunctionComponent<{}> = (props) => {
    const [data, setData] = useState<DataType | undefined>(undefined);
    const uuid: uuid = useParams().uuid!;

    // get all the data
    useEffect(() => {
        async function getData() {
            const advData = await cache.getAdvancements(uuid!);
            const playerData = await cache.getPlayer(uuid!);
            const statsData = await cache.getStats(uuid!);

            setData({ advancements: advData, player: playerData, stats: statsData });
        }
        getData();
    }, [uuid]);

    if (!data) {
        return (
            <LoadingPage />
        );
    } else {
        return (
            <main>
                <MCPlayerCardContainer uuid={uuid} advancements={data.advancements} player={data.player} />
            </main>
        );
    }

};

type DataType = { advancements: advancementsData, player: playerData, stats: statsData; };

export default PlayersPage;
