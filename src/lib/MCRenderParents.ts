import { Mesh, Scene } from "@babylonjs/core";
import MCRender from "./MCRender";
// TODO: I feel like this is a circular import
// TODO: && false this, clear models and texture folder, and add back what is needed

/* Common Parent Models */
export namespace MCRenderParents {
    /* Method to get the parent function from the resource */
    export function getParentFunction(parent: ResourceLocationType): ParentFunctionType | null {
        const trimmedParent = parent.replaceAll("minecraft:", "");
        if (trimmedParent in MCRenderParents.parents) {
            // already a hard coded parent
            return MCRenderParents.parents[trimmedParent];
        }

        // unknown parent
        return null;
    }

    /* The inbuilt translation methods to save on fetches for parent model files */
    export function cube(scene: Scene, textures: SideData<ImageOrUndefined>): Promise<SideData<Mesh>> {
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

    export function cubeAll(scene: Scene, textures: CubeAllData<ImageOrUndefined>) {
        return MCRenderParents.cube(scene, {
            up: textures.all,
            down: textures.all,
            north: textures.all,
            south: textures.all,
            east: textures.all,
            west: textures.all
        });
    }

    export function cubeBottomTop(scene: Scene, textures: CubeBottomTopData<ImageOrUndefined>) {
        return MCRenderParents.cube(scene, {
            up: textures.top,
            down: textures.bottom,
            north: textures.side,
            south: textures.side,
            east: textures.side,
            west: textures.side
        });
    }

    export function cubeColumn(scene: Scene, textures: CubeColumnData<ImageOrUndefined>) {
        return MCRenderParents.cube(scene, {
            up: textures.end,
            down: textures.end,
            north: textures.side,
            south: textures.side,
            east: textures.side,
            west: textures.side
        });
    }

    export function cubeTop(scene: Scene, textures: CubeTopData<ImageOrUndefined>) {
        return MCRenderParents.cube(scene, {
            up: textures.top,
            down: textures.side,
            north: textures.side,
            south: textures.side,
            east: textures.side,
            west: textures.side
        });
    }

    export function orientableWithBottom(scene: Scene, textures: OrientableWithBottomData<ImageOrUndefined>) {
        return MCRenderParents.cube(scene, {
            up: textures.top,
            down: textures.bottom,
            north: textures.front,
            south: textures.side,
            east: textures.side,
            west: textures.side
        });
    }

    export function orientable(scene: Scene, textures: OrientableData<ImageOrUndefined>) {
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
        "block/cube_all": MCRenderParents.cubeAll,
        "block/cube_bottom_top": MCRenderParents.cubeBottomTop,
        "block/cube_column": MCRenderParents.cubeColumn,
        "block/cube_top": MCRenderParents.cubeTop,
        "block/orientable": MCRenderParents.orientable,
        "block/orientable_with_bottom": MCRenderParents.orientableWithBottom,
    };
}

type ParentFunctionType = (scene: Scene, textures: {}) => Promise<SideData<Mesh>>;
type CubeAllData<T> = { all?: T; };
type CubeBottomTopData<T> = { bottom?: T; top?: T; side?: T; };
type CubeColumnData<T> = { end?: T; side?: T; };
type CubeTopData<T> = { side?: T; top?: T; };
type OrientableData<T> = { top?: T; side?: T; front?: T; };
type OrientableWithBottomData<T> = { bottom?: T; top?: T; side?: T; front?: T; };

export default MCRenderParents;