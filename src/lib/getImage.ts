/* Gets an image element from a src */
export async function getImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        src = src.replace("http://", "https://");
        console.info("getImage: Retrieving Image");
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.addEventListener("load", () => { resolve(img); });
        img.addEventListener("error", (e) => { reject(e); });
        img.src = src;
        // TODO: Figure out how and if i need to samesite=Strict
    });
}

export default getImage; 