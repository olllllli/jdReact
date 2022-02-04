import { Mesh, Scene } from "@babylonjs/core";
import MCRender from "./MCRender";
// TODO: I feel like this is a circular import

/* Common Parent Models */
export namespace MCRenderParents {
    /* Method to get the parent function from the resource */
    export function getParentFunction(parent: ResourceLocationType): ParentFunctionType | null {
        const trimmedParent = parent.replaceAll("minecraft:", "");
        if (trimmedParent in MCRenderParents.parents) {
            // already a hard coded parent
            return MCRenderParents.parents[parent];
        }

        // unknown parent
        return null;
    }

    /* Creates a cube given the side materials */
    export function cube(scene: Scene, textures: SideData<HTMLImageElement | undefined>): Promise<SideData<Mesh>> {
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

    /* The translation methods */
    export function orientableVertical(scene: Scene, textures: OrientableVerticalData<HTMLImageElement | undefined>) {
        return MCRenderParents.cube(scene, {
            up: textures.front,
            down: textures.side,
            north: textures.side,
            south: textures.side,
            east: textures.side,
            west: textures.side
        });
    }

    export function orientableWithBottom(scene: Scene, textures: OrientableWithBottomData<HTMLImageElement | undefined>) {
        return MCRenderParents.cube(scene, {
            up: textures.top,
            down: textures.bottom,
            north: textures.front,
            south: textures.side,
            east: textures.side,
            west: textures.side
        });
    }

    export function orientable(scene: Scene, textures: OrientableData<HTMLImageElement | undefined>) {
        return MCRenderParents.orientableWithBottom(scene, {
            top: textures.top,
            bottom: textures.top,
            front: textures.front,
            side: textures.side
        });
    }

    // NOTE: Diliberately left to only required ones
    // TODO: Figure out how to type this properly
    export const parents: { [parent: string]: ParentFunctionType; } = {
        "block/cube": MCRenderParents.cube,
        "block/orientable": MCRenderParents.orientable,
        "block/orientable_vertical": MCRenderParents.orientableVertical,
        "block/orientable_with_bottom": MCRenderParents.orientableWithBottom,
    };
}

type ParentFunctionType = (scene: Scene, textures: {}) => Promise<SideData<Mesh>>;
type OrientableVerticalData<T> = { side?: T; front?: T; };
type OrientableData<T> = { top?: T; } & OrientableVerticalData<T>;
type OrientableWithBottomData<T> = { bottom?: T; } & OrientableData<T>;

export default MCRenderParents;