import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

import "styles/gui.scss";
import "styles/global.scss";
import "styles/index.scss";
import { CacheManager } from 'lib/CacheManager';

export const cache = new CacheManager();

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <RecoilRoot>
                <App />
            </RecoilRoot>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

