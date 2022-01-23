import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CacheManager } from 'lib/CacheManager';
import { useRecoilState } from 'recoil';
import MCToast from 'components/MCToast';

import knowledge_book from "./img/resourcepacks/vanilla/assets/minecraft/textures/item/knowledge_book.png"

console.log("App Started");

function App() {
    return (
        <>
            <header>
                <MCToast>
                    <h2>BANNER!!!!!!!!</h2>
                </MCToast>
            </header>
            <main>
                <nav>
                    <MCToast type="link" to="advancements">
                        <img src={knowledge_book} /><h2>Advancements</h2>
                    </MCToast>
                    <MCToast type="link" to="players">
                        <h2>Players</h2>
                    </MCToast>
                    <MCToast type="link" to="stats">
                        <h2>Stats</h2>
                    </MCToast>
                </nav>
            </main>
        </>
    );
}

export default App;
