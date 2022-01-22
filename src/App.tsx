import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CacheManager } from 'lib/CacheManager';
import { useRecoilState } from 'recoil';
import { cacheState } from 'atoms/cache';



async function printUUIDs(cache: CacheManager) {
    const uuids = await cache.getUUIDs();
    console.log(uuids);
}

function App() {
    const [cache, _] = useRecoilState(cacheState);

    return (
        <div onClick={() => { if (cache) { printUUIDs(cache) } }} style={
            {
                width: 100,
                height: 100,
                backgroundColor: "red"
            }
        }>
            click
        </div>
    );
}

export default App;
