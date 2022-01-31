import getSkin from "lib/getSkinImage";
import React, { useEffect, useRef, useState } from "react";
import { FunctionComponent } from "react";

import offlineSkin from "img/gui/offline_skin.png";
import missingTexture from "img/gui/missing_texture.png";

/* Component for the face of a minecraft skin */
// methodology inspired by the great work of `github/sunsetkookaburra`
interface MCHeadProps {
    layers: "inner" | "both" | "bothSmall";
    data: playerData;
}

const MCHead: FunctionComponent<MCHeadProps> = (props) => {
    const [img, setImg] = useState<HTMLImageElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // get the image
    useEffect(() => {
        async function getImg() {
            try {
                const url = props.data.offline ? offlineSkin : props.data.skin;
                const skin = await getSkin(url);
                setImg(skin);
            } catch (e) {
                console.error(`MCHead: Could not get skin for ${props.data.username}`);
                console.error(e);
            }
        }
        getImg();
    }, [props.data.offline, props.data.skin, props.data.username]);

    // draw onto the canvas
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx && img) {
                ctx.imageSmoothingEnabled = false;
                // draw differently depending on the given layer
                if (props.layers === "inner" || props.layers === "bothSmall") {
                    ctx.drawImage(img, 8, 8, 8, 8, 0, 0, 8, 8);
                }
                if (props.layers === "bothSmall") {
                    ctx.drawImage(img, 40, 8, 8, 8, 0, 0, 8, 8);
                }
                if (props.layers === "both") {
                    ctx.drawImage(img, 8, 8, 8, 8, 4, 4, 32, 32); // inner layer
                    ctx.drawImage(img, 40, 8, 8, 8, 0, 0, 40, 40); // outer layer
                }

            }
        }
    }, [img, props.layers]);

    // return the element
    if (!img) {
        return (
            <img className="MCHead" height={8} width={8} src={missingTexture} alt="missing" />
        );
    } else if (props.layers === "both") {
        return (
            <canvas className="MCHead" height={40} width={40} ref={canvasRef} />
        );
    } else {
        return (
            <canvas className="MCHead" height={8} width={8} ref={canvasRef} />
        );
    }

};

// NOTE: Memoized, since this is used lots and has fetch calls
export default React.memo(MCHead);