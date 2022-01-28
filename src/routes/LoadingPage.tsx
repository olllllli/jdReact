import { FunctionComponent } from "react";
import MCToast from "components/MCToast";

const LoadingPage: FunctionComponent<{}> = () => {
    return (
        <>
            <header className="SubpageHeader">
                <MCToast>
                    <div className="img loadingIcon" />
                    <h2>Loading...</h2>
                </MCToast>
            </header>
            <main>
                <style>
                    {
                        `
                            div.loadingIcon {
                                width: 256px;
                                height: 256px;
                            }
                            div.spinner {
                                display: inline-block;
                                animation: 10s linear infinite spinning;
                                width: fit-content;
                                height: fit-content;
                            }
                            @keyframes spinning {
                                from {
                                    transform:rotate(0deg);
                                }
                                to {
                                    transform:rotate(360deg);
                                }
                            }
                        `

                    }
                </style>
                <div className="spinner"><div className="loadingIcon" /></div>
                <div className="spinner"><div className="loadingIcon" /></div>
                <div className="spinner"><div className="loadingIcon" /></div>
                <div className="spinner"><div className="loadingIcon" /></div>
                <div className="spinner"><div className="loadingIcon" /></div>
                <div className="spinner"><div className="loadingIcon" /></div>
                <div className="spinner"><div className="loadingIcon" /></div>
                <div className="spinner"><div className="loadingIcon" /></div>
                <div className="spinner"><div className="loadingIcon" /></div>
                <div className="spinner"><div className="loadingIcon" /></div>
                <div className="spinner"><div className="loadingIcon" /></div>
                <div className="spinner"><div className="loadingIcon" /></div>
            </main>
        </>
    );
};

export default LoadingPage;
