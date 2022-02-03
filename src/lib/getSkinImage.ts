/* Returns an img element of the skin, or an error */

async function getSkin(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        src = src.replace("http://", "https://");
        console.info("getSkin: Retrieving Skin");
        const img = new Image();
        img.addEventListener("load", () => { resolve(img); });
        img.addEventListener("error", (e) => { reject(e); });
        img.src = src;
        // TODO: Figure out how and if i need to samesite=Strict
    });
}

export default getSkin; 