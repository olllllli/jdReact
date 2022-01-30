/* Returns an img element of the skin, or an error */

async function getSkin(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        src = src.replace("http://", "https://");
        const img = new Image();
        img.addEventListener("load", () => { resolve(img); });
        img.addEventListener("error", (e) => { reject(e); });
        img.src = src;
    });
}

export default getSkin; 