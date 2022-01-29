import { FunctionComponent, useEffect, useState } from "react";
import MCAdvView from "./MCAdvView";
import { MCSelect } from "./MCSelect";
import { MCOption } from "./MCOption";

import "styles/components/MCAdvContainer.scss";
import { cache } from "index";

/* The container gui for an advancement view, contains the selects and the view */
// TODO: Possibly figure out how to only rerender the view
const MCAdvContainer: FunctionComponent<{}> = () => {
    const [category, setCategory] = useState<string>("story");
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
    Array.from(usernames)
        .sort(([, a], [, b]) => a.localeCompare(b))
        .forEach(([uuid, username]) => {
            users.push(
                <MCOption value={uuid} key={uuid} onSelect={setCurrentUser}>
                    {username}
                </MCOption>
            );
        });


    // return the component
    console.log("rendered advContainer");
    return (
        <div className="MCAdvContainer">
            <div className="header">
                <div>
                    <MCSelect currentValue={currentUser}>
                        {users}
                    </MCSelect>
                </div>
                <div>
                    <MCSelect currentValue={category}>
                        <MCOption onSelect={setCategory} value="story">Story</MCOption>
                        <MCOption onSelect={setCategory} value="nether">Nether</MCOption>
                        <MCOption onSelect={setCategory} value="end">End</MCOption>
                        <MCOption onSelect={setCategory} value="adventure">Adventure</MCOption>
                        <MCOption onSelect={setCategory} value="husbandry">Husbandry</MCOption>
                    </MCSelect>
                </div>
            </div>
            <div className="view">
                <MCAdvView category={category as AdvCategory} user={currentUser} />
            </div>
        </div>
    );
};

export default MCAdvContainer;
