import { ArcRotateCamera, Scene, StandardMaterial, Texture, Vector3, Plane as BABYLONPlane, MeshBuilder, Mesh, Vector4, Color3, DynamicTexture, Camera } from "@babylonjs/core";
const directions: Direction[] = ["up", "down", "north", "south", "east", "west"];

/* Namespace for functions relating to rendering minecraft models with babylonjs */
namespace MCRender {
    /* Setup the camera with the correct view */
    export function setupCamera(scene: Scene, ortho: boolean = true): ArcRotateCamera {
        // calcuate the values
        const radius = 64;
        const target = Vector3.ZeroReadOnly;
        const horizontalRotation = Math.PI / 4;
        const verticalRotation = Math.PI / 3; // the wiki to standardise 2:1
        // const verticalRotation = Math.atan(Math.sqrt(2)); // the real angle

        // create camera
        const camera = new ArcRotateCamera("mainCamera", horizontalRotation, verticalRotation, radius, target, scene);
        if (ortho) {
            const zoom = 16;
            const engine = scene.getEngine();
            camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
            camera.orthoLeft = -zoom * engine.getScreenAspectRatio();
            camera.orthoRight = zoom * engine.getScreenAspectRatio();
            camera.orthoTop = zoom;
            camera.orthoBottom = -zoom;
        }

        // TODO: USE FRAMING BEHAVIOUR
        // https://forum.babylonjs.com/t/set-the-cameras-viewport-to-fit-the-size-of-the-object/23500/4
        // https://playground.babylonjs.com/#3TE6AD#3
        // https://doc.babylonjs.com/divingDeeper/behaviors/cameraBehaviors#framing-behavior

        camera.attachControl(); // DEBUG: Remove this
        return camera;
    }

    /* Create a new basic emmisive material with no lighting, will resolve regardless */
    export async function basicMaterial(scene: Scene, src: string, name: string, shading: number = 1): Promise<StandardMaterial> {
        return new Promise((resolve, reject) => {
            const texture = new Texture(
                src,
                scene,
                undefined,
                undefined,
                Texture.NEAREST_SAMPLINGMODE,
                () => {
                    const material = new StandardMaterial(name, scene);
                    texture.level = shading;
                    texture.hasAlpha = true;
                    material.emissiveColor = new Color3(1, 1, 1);
                    material.useAlphaFromDiffuseTexture = true;
                    material.diffuseTexture = texture;
                    material.backFaceCulling = true;
                    material.disableLighting = true;

                    resolve(material);
                },
                (msg, err) => {
                    console.error("MCRender.basicMaterial:", msg, "\nSource:", src, "\nError:", err);
                    const material = new StandardMaterial(name, scene);
                    texture.level = shading;
                    material.emissiveTexture = texture;
                    material.disableLighting = true;

                    resolve(material); // NOTE: could make this a reject
                }
            );
        });
    }

    /* Resolves texture resource locations to materials. Expects texture variables that are not resolvable to be given */
    export async function resolveMaterials(scene: Scene, data: ResourceData): Promise<TextureData<StandardMaterial>> {
        const basePath = "/resourcepacks/vanilla/assets/minecraft/textures/";
        const res: TextureData<StandardMaterial> = {};

        const uniquePaths = new Map<`block/${string}`, StandardMaterial>();

        // go through each of the ones with a path first
        for (const textureVariable in data) {
            const resource = data[textureVariable].replaceAll("minecraft:", "") as `block/${string}`;
            if (resource.at(0) !== "#") {
                // not a variable, create a material for it and add it to res
                // check if its already gotten
                if (!uniquePaths.has(resource)) {
                    // resolve the basic material
                    const material = await MCRender.basicMaterial(scene, `${basePath}${resource}.png`, resource);
                    uniquePaths.set(resource, material);
                }
                res[textureVariable] = uniquePaths.get(resource)!;
            }
        }

        // now resolve the variables until no more are resolvable
        let variableResolved = true;
        while (variableResolved) {
            variableResolved = false;
            for (const textureVariable in data) {
                const resource = data[textureVariable].replaceAll("minecraft:", "");
                if (!(textureVariable in res) && resource.at(0) === "#") {
                    // check if its source is already gotten
                    const source = resource.slice(1);
                    if (source in res) {
                        // copy it
                        variableResolved = true;
                        // console.log("setting", textureVariable, "to", source);
                        res[textureVariable] = res[source];
                    }
                }
            }
        }

        return res;
    }

    /* Gets an image element from a src */
    export async function getImage(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            console.info("getImage: Retrieving Image");
            const img = new Image();
            img.addEventListener("load", () => { resolve(img); });
            img.addEventListener("error", (e) => { reject(e); });
            img.src = src;
            // TODO: Figure out how and if i need to samesite=Strict
        });
    }

    /* Resolves texture resource locations to Image Elements. Expects texture variables that are not resolvable to be given */
    export async function resolveTextures(data: ResourceData): Promise<TextureData<HTMLImageElement | undefined>> {
        const basePath = "/resourcepacks/vanilla/assets/minecraft/textures/";
        const res: TextureData<HTMLImageElement | undefined> = {};
        const uniqueImages = new Map<`block/${string}`, HTMLImageElement | undefined>();

        // go through each of the ones with a path first
        for (const textureVariable in data) {
            const resourceLocation = data[textureVariable].replaceAll("minecraft:", "") as `block/${string}`;
            if (resourceLocation.at(0) !== "#") {
                // not a variable, get the image and add it to res
                if (!uniqueImages.has(resourceLocation)) {
                    try {
                        const image = await MCRender.getImage(`${basePath}${resourceLocation}.png`);
                        uniqueImages.set(resourceLocation, image);
                    } catch (err) {
                        console.log(err);
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
                    // check if its source is already gotten
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
        /* Common Parent Models */
        export namespace Parent {

            /* Creates a cube given the side materials */
            export function cube(scene: Scene, textures: SideData<HTMLImageElement | undefined>): SideData<Mesh> {
                // build from block/cube data because this works really well
                const elementData: ElementDataType = {
                    "from": [0, 0, 0],
                    "to": [16, 16, 16],
                    "faces": {
                        "down": { "texture": "#down", "cullface": "down" },
                        "up": { "texture": "#up", "cullface": "up" },
                        "north": { "texture": "#north", "cullface": "north" },
                        "south": { "texture": "#south", "cullface": "south" },
                        "west": { "texture": "#west", "cullface": "west" },
                        "east": { "texture": "#east", "cullface": "east" }
                    }
                };
                return MCRender.Model.fromElementData(scene, "cube", elementData, textures);
            }

            /* Creates a cube for orientable_vertical */
            export function orientableVertical(scene: Scene, textures: OrientableVerticalData<HTMLImageElement | undefined>) {
                return MCRender.Model.Parent.cube(scene, {
                    up: textures.front,
                    down: textures.side,
                    north: textures.side,
                    south: textures.side,
                    east: textures.side,
                    west: textures.side
                });
            }

            /* Creates a cube for orientable_with_bottom */
            export function orientableWithBottom(scene: Scene, textures: OrientableWithBottomData<HTMLImageElement | undefined>) {
                return MCRender.Model.Parent.cube(scene, {
                    up: textures.top,
                    down: textures.bottom,
                    north: textures.front,
                    south: textures.side,
                    east: textures.side,
                    west: textures.side
                });
            }

            /* Creates a cube for orientable */
            export function orientable(scene: Scene, textures: OrientableData<HTMLImageElement | undefined>) {
                return MCRender.Model.Parent.orientableWithBottom(scene, {
                    top: textures.top,
                    bottom: textures.top,
                    front: textures.front,
                    side: textures.side
                });
            }
        }
        // TODO: Implement more parent models and fill out the ones already implemented
        const parents: { [parent: string]: (scene: Scene, sources: any) => SideData<Mesh>; } = {
            "block/cube": MCRender.Model.Parent.cube,
            "block/orientable": MCRender.Model.Parent.orientable,
            "block/orientable_vertical": MCRender.Model.Parent.orientableVertical,
            "block/orientable_with_bottom": MCRender.Model.Parent.orientableWithBottom,
        };

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
        export function fromElementData(scene: Scene, elementName: string, data: ElementDataType, textures: TextureData<HTMLImageElement | undefined>) {
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
                }
            }

            return res;
        }

        /* Creates a mesh from model data */
        export async function fromModelData(scene: Scene, data: BlockModelDataType) {
            // check if elements is defined, if it is, ignore parent // NOTE: might be wrong
            const trimmedParent = data.parent.replaceAll("minecraft:", "") as ResourceLocationTypeTrimmed;
            if (data.elements && data.textures) {
                const textures = await MCRender.resolveTextures(data.textures);
                const sides = [];
                let elementNumber = 0;
                for (const element of data.elements.slice(0)) {
                    sides.push(MCRender.Model.fromElementData(scene, String(elementNumber), element, textures));
                    elementNumber += 1;
                }
                return sides;
            } else if (!data.elements && data.textures && (trimmedParent in parents)) {
                const textures = await MCRender.resolveTextures(data.textures);
                const planes = parents[trimmedParent](scene, textures);
                return [planes];
            } else {
                console.error("MCRender.Model.fromModelData: Cannot build from model data.\n", data);
            }
        }
    }
}

export default MCRender;