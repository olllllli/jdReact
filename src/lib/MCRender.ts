import { ArcRotateCamera, Scene, StandardMaterial, Texture, Vector3, Plane as BABYLONPlane, MeshBuilder, Mesh, Vector4, Color3, DynamicTexture, Camera } from "@babylonjs/core";
import { MCRenderParents } from "lib/MCRenderParents";
import getImage from "lib/getImage";
import { RESOURCEPACK } from "lib/globalConstants";
import missingTexture from "img/gui/missing_texture.png";
const directions: Direction[] = ["up", "down", "north", "south", "east", "west"];

// TODO: Enchant glint

/* Namespace for functions relating to rendering minecraft models with babylonjs */
namespace MCRender {
    /* Setup the camera with the correct view */
    export function setupCamera(scene: Scene, ortho: boolean = true): ArcRotateCamera {
        // calcuate the values
        const radius = 32;
        const target = new Vector3(8, 8, 8);
        const horizontalRotation = Math.PI / 4;
        const verticalRotation = Math.PI / 3; // the wiki to standardise 2:1
        // const verticalRotation = Math.atan(Math.sqrt(2)); // the real angle

        // create camera
        const camera = new ArcRotateCamera("mainCamera", horizontalRotation, verticalRotation, radius, target, scene);
        if (ortho) {
            // const zoom = 4 * Math.PI; // not sure why but this is what i found to be correct
            const zoom = 13; // more whole
            const engine = scene.getEngine();
            camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
            camera.orthoLeft = -zoom * engine.getScreenAspectRatio();
            camera.orthoRight = zoom * engine.getScreenAspectRatio();
            camera.orthoTop = zoom;
            camera.orthoBottom = -zoom;
        }

        // camera.attachControl(); // DEBUG: Remove this
        return camera;
    }

    /* Gets model data for a block */
    export async function getModelData(src: ResourceLocationType): Promise<BlockModelDataType | undefined> {
        // TODO: deal with builtin/generated
        const trimmedLocation = src.replaceAll("minecraft:", "");

        console.info(`MCRender.getModelData: Getting model file "${src}".`);
        const res = await fetch(RESOURCEPACK + "/models/" + trimmedLocation + ".json");
        // TODO: make this more water tight
        if (res.headers.get("content-type") && res.headers.get("content-type")!.includes("text/html")) {
            console.error("MCRender.getModelData: Error getting", RESOURCEPACK + "/models/" + trimmedLocation + ".json");
            return undefined;
        }

        const parentsData: BlockModelDataType = await res.json();
        return parentsData;
    }

    /* Resolves texture resource locations to Image Elements. Expects texture variables that are not resolvable to be given */
    export async function resolveTextures(data: ResourceData, knownTextureVariables?: TextureData<HTMLImageElement | undefined>): Promise<TextureData<HTMLImageElement | undefined>> {
        const basePath = RESOURCEPACK + "/textures/";
        const uniqueImages = new Map<`block/${string}`, HTMLImageElement | undefined>();
        // have the res already contain the known texture variables
        const res: TextureData<HTMLImageElement | undefined> = knownTextureVariables ?? {};

        // go through each of the ones with a path first
        for (const textureVariable in data) {
            // skip if this texture variable was already known and defined, this will allow overrides
            if (textureVariable in res && res[textureVariable]) {
                continue;
            }

            const resourceLocation = data[textureVariable].replaceAll("minecraft:", "") as `block/${string}`;
            if (resourceLocation.at(0) !== "#") {
                // not a variable, get the image and add it to res
                if (!uniqueImages.has(resourceLocation)) {
                    try {
                        const image = await getImage(`${basePath}${resourceLocation}.png`);
                        uniqueImages.set(resourceLocation, image);
                    } catch (err) {
                        console.error(`MCRender.resolveTextures: Missing resource file ${basePath}${resourceLocation}.png`, err);
                        uniqueImages.set(resourceLocation, undefined);
                    }
                }
                res[textureVariable] = uniqueImages.get(resourceLocation)!;
            }
        }

        // now resolve the variables until no more are resolvable
        let variableResolved = true;
        while (variableResolved) {
            variableResolved = false;
            for (const textureVariable in data) {
                const resourceLocation = data[textureVariable].replaceAll("minecraft:", "");
                if (!(textureVariable in res) && resourceLocation.at(0) === "#") {
                    const sourceTexture = resourceLocation.slice(1);
                    if (sourceTexture in res) {
                        variableResolved = true;
                        res[textureVariable] = res[sourceTexture];
                    }
                }
            }
        }

        return res;
    }

    /* Creates a material containing a dynamic texture, given the image and the uv */
    export function dynamicMaterial(scene: Scene, name: string, img: HTMLImageElement | undefined, uv: Vector4, w: number, h: number, shading: number = 1): StandardMaterial {
        // create the material, and return early if the img is undefined
        const material = new StandardMaterial(name, scene);
        material.emissiveColor = new Color3(1, 1, 1);
        material.backFaceCulling = true;
        material.disableLighting = true;
        if (img === undefined) {
            // just add a diffuse texture of missing texture
            const texture = new Texture(
                missingTexture,
                scene,
                undefined,
                undefined,
                Texture.NEAREST_SAMPLINGMODE
            );
            material.diffuseTexture = texture;
            return material;
        }

        // create the dynamic texture
        const texture = new DynamicTexture(
            `${name}_texture`,
            { height: h, width: w },
            scene,
            false,
            Texture.NEAREST_SAMPLINGMODE
        );

        // get the sizes and orientation
        const sx = Math.min(uv.x, uv.z);
        const sy = Math.min(uv.y, uv.w);
        const sw = Math.abs(uv.z - uv.x);
        const sh = Math.abs(uv.w - uv.y);
        const xInvert = Math.sign(uv.z - uv.x) ?? 1;
        const yInvert = Math.sign(uv.w - uv.y) ?? 1;

        // draw the image on
        const ctx = texture.getContext();
        ctx.scale(1 * xInvert, 1 * yInvert);
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w * xInvert, h * yInvert);
        texture.update();

        texture.hasAlpha = true;
        texture.level = shading;
        material.diffuseTexture = texture;
        material.useAlphaFromDiffuseTexture = true;
        return material;
    }



    /* Vector creation */
    export namespace Vectors {
        /* The standard directional vectors */
        // NOTE: Not the same directions as minecraft, north is +z instead of -z. This does not need to be accounted for.  
        export const up = new Vector3(0, 1, 0);
        export const down = new Vector3(0, -1, 0);
        export const north = new Vector3(0, 0, 1);
        export const south = new Vector3(0, 0, -1);
        export const east = new Vector3(1, 0, 0);
        export const west = new Vector3(-1, 0, 0);

        export const pos = (x: number, y: number, z: number) => new Vector3(x, y, z);

        /* Returns the mid point of two vectors */
        export function midPoint(v1: Vector3, v2: Vector3): Vector3 {
            const twoVector = new Vector3(2, 2, 2);
            const sumVec = v1.add(v2);
            return sumVec.divideInPlace(twoVector);
        }
    }

    /* Plane creation */
    export namespace Plane {
        /* Creates a plane given a facing, center, height and width */
        export function fromCenterAndDimensions(scene: Scene, name: string, facing: Vector3, center: Vector3, w: number, h: number): Mesh {
            const abs = BABYLONPlane.FromPositionAndNormal(center, facing);
            const plane = MeshBuilder.CreatePlane(name, { sourcePlane: abs, height: h, width: w }, scene);
            plane.position = center;
            return plane;
        }
    }

    /* Model creation */
    export namespace Model {
        /* Shading levels for the sides of the cube */
        const shading: SideData<number> = {
            // wiki defined
            up: 0.98,
            east: 0.80,
            north: 0.608,
            // assumed
            down: 0.2,
            south: 0.7,
            west: 0.5,
        };

        /* Creates a mesh from an element data */
        export async function fromElementData(scene: Scene, elementName: string, data: ElementDataType, textures: TextureData<HTMLImageElement | undefined>): Promise<SideData<Mesh>> {
            // calcuate the planes dimensions
            const [x1, y1, z1] = data.from;
            const [x2, y2, z2] = data.to;
            // TODO: handle more cases
            const planeDimensions: SideData<{ c: Vector3, h: number, w: number; }> = {
                up: { h: Math.abs(x2 - x1), w: Math.abs(z2 - z1), c: MCRender.Vectors.midPoint(new Vector3(x1, y2, z1), new Vector3(x2, y2, z2)) },
                down: { h: Math.abs(x2 - x1), w: Math.abs(z2 - z1), c: MCRender.Vectors.midPoint(new Vector3(x1, y1, z1), new Vector3(x2, y1, z2)) },
                north: { h: Math.abs(y2 - y1), w: Math.abs(z2 - z1), c: MCRender.Vectors.midPoint(new Vector3(x1, y1, z2), new Vector3(x2, y2, z2)) },
                south: { h: Math.abs(y2 - y1), w: Math.abs(z2 - z1), c: MCRender.Vectors.midPoint(new Vector3(x1, y1, z1), new Vector3(x2, y2, z1)) },
                east: { h: Math.abs(y2 - y1), w: Math.abs(x2 - x1), c: MCRender.Vectors.midPoint(new Vector3(x2, y1, z1), new Vector3(x2, y2, z2)) },
                west: { h: Math.abs(y2 - y1), w: Math.abs(x2 - x1), c: MCRender.Vectors.midPoint(new Vector3(x1, y1, z1), new Vector3(x1, y2, z2)) },
            };

            // create the planes
            const res: SideData<Mesh> = {};
            const planes: Mesh[] = [];
            for (const side of directions) {
                const face = data.faces[side];
                // check if the face needs a plane
                if (face) {
                    // get the uv
                    const image = textures[face.texture.slice(1)];
                    let uv = face.uv;
                    if (!(face.uv) && image) {
                        // if there was no uv data in the element, but there is an image, just use images size
                        uv = [0, 0, image.width, image.height];
                    }

                    // create the material and the plane, and add the material to the plane
                    const material = MCRender.dynamicMaterial(
                        scene,
                        `${elementName}/${side}/material`,
                        image,
                        uv ? Vector4.FromArray(uv) : Vector4.Zero(),
                        planeDimensions[side]!.w,
                        planeDimensions[side]!.h,
                        (!data.shade || data.shade === true) ? shading[side] : undefined
                    );
                    const mesh = MCRender.Plane.fromCenterAndDimensions(
                        scene,
                        `${elementName}/${side}`,
                        MCRender.Vectors[side],
                        planeDimensions[side]!.c,
                        planeDimensions[side]!.w,
                        planeDimensions[side]!.h,
                    );
                    mesh.material = material;

                    res[side] = mesh;
                    planes.push(mesh);
                }
            }

            // await each side being rendered, this is so we can disable engine when we want to
            // TODO: Maybe add a non async version
            await Promise.all(
                planes.map((plane) => {
                    return new Promise((resolve) => {
                        plane.onAfterRenderObservable.addOnce(() => {
                            resolve(plane);
                        });
                    });
                })
            );

            return res;
        }

        /* Creates a mesh from model data */
        export async function fromModelData(scene: Scene, data: BlockModelDataType, knownTextureVariables?: TextureData<HTMLImageElement | undefined>): Promise<SideData<Mesh>[]> {
            if (data.elements) {
                // render from element data
                const textures = await MCRender.resolveTextures(data.textures ?? {}, knownTextureVariables);
                // render each element
                const planes = [];
                let elementNumber = 0;
                for (const element of data.elements) {
                    // TODO: Fix this await
                    planes.push(await MCRender.Model.fromElementData(scene, String(elementNumber), element, textures));
                    elementNumber += 1;
                }
                return planes;

            } else if (!data.elements && data.parent) {
                // render from parent
                const textures = await MCRender.resolveTextures(data.textures ?? {}, knownTextureVariables);
                // get the parents translation function
                const parentFunction = MCRenderParents.getParentFunction(data.parent);
                if (parentFunction) {
                    const planes = await parentFunction(scene, textures);
                    return [planes];
                } else {
                    // parent is not hardcoded, try get its data from the model file and recursively call this
                    const parentsData = await getModelData(data.parent);
                    return parentsData ? fromModelData(scene, parentsData, textures) : [];
                }

            } else {
                console.error("Cannot parse model data:", data);
                throw new Error("MCRender.Model.fromModelData: Cannot build from model data.\n");
            }
        }
    }
}

export default MCRender;