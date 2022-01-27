import { FunctionComponent, useEffect, useState } from "react";
import MCAdvView from "./MCAdvView";
import { MCSelect, MCOption } from "./MCSelect";

import "styles/components/MCAdvContainer.scss";
import { cache } from "index";

/* The container gui for an advancement view, contains the selects and the view */
// TODO: Possibly figure out how to only rerender the view
const MCAdvContainer: FunctionComponent<{}> = () => {
    const [category, setCategory] = useState<AdvCategory>("story");
    const [currentUser, setCurrentUser] = useState<uuid | undefined>(undefined);
    const [usernames, setUsernames] = useState<Map<uuid, string>>(new Map<uuid, string>());

    // get the user list asyncronously, will render an empty select until this is retrieved
    useEffect(() => {
        async function getUsers() {
            const usernameMap = await cache.getUUIDMap();
            // TODO: Handle possible errors
            setUsernames(usernameMap);
        }
        getUsers();
    }, []);

    // create all the user options
    let users: JSX.Element[] = [];
    usernames.forEach((username, uuid) => {
        users.push(<MCOption value={uuid} display={username} key={uuid} />);
    });

    console.log("rendered advContainer");
    return (
        <div className="MCAdvContainer">
            <div className="header">
                <div>
                    <MCSelect onChange={setCurrentUser}>{users}</MCSelect>
                </div>
                <div>
                    <MCSelect onChange={setCategory}>
                        <MCOption value="story" display="Story" selected={true} />
                        <MCOption value="nether" display="Nether" />
                        <MCOption value="end" display="End" />
                        <MCOption value="adventure" display="Adventure" />
                        <MCOption value="husbandry" display="Husbandry" />
                    </MCSelect>
                </div>
            </div>
            <div className="view">
                <MCAdvView category={category} user={currentUser} />
            </div>
        </div>
    );
};

export default MCAdvContainer;
