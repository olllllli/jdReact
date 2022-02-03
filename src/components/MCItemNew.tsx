import { FunctionComponent } from "react";
import SceneComponent from 'babylonjs-hook';

import * as BABYLON from "@babylonjs/core";
import MCRender from "lib/MCRender";

import "styles/components/MCItem.scss";
import getSkin from "lib/getSkinImage";

interface MCItemProps {
    // type: "item" | "block";
    // name: string;
    // enchanted?: boolean;
}

// render the face
function onSceneReady(scene: BABYLON.Scene) {
    // TODO: turn off engine once rendered
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    const camera = MCRender.setupCamera(scene);

    const lightingRod: BlockModelDataType = {
        "parent": "block/block",
        "display": {
            "head": {
                "rotation": [-180, 0, 0],
                "translation": [8.5, 4, 0]
            },
            "thirdperson_righthand": {
                "translation": [0, 2, 0.5],
                "scale": [0.40, 0.40, 0.40]
            }
        },
        "ambientocclusion": false,
        "textures": {
            "texture": "block/lightning_rod",
            "particle": "block/lightning_rod"
        },
        "elements": [
            {
                "from": [6, 12, 6],
                "to": [10, 16, 10],
                "faces": {
                    "north": { "uv": [0, 0, 4, 4], "texture": "#texture" },
                    "south": { "uv": [0, 0, 4, 4], "texture": "#texture" },
                    "west": { "uv": [0, 0, 4, 4], "texture": "#texture" },
                    "east": { "uv": [0, 0, 4, 4], "texture": "#texture" },
                    "down": { "uv": [0, 0, 4, 4], "texture": "#texture" },
                    "up": { "uv": [4, 4, 0, 0], "texture": "#texture" }
                }
            },
            {
                "from": [7, 0, 7],
                "to": [9, 12, 9],
                "faces": {
                    "north": { "uv": [0, 4, 2, 16], "texture": "#texture" },
                    "south": { "uv": [0, 4, 2, 16], "texture": "#texture" },
                    "west": { "uv": [0, 4, 2, 16], "texture": "#texture" },
                    "east": { "uv": [0, 4, 2, 16], "texture": "#texture" },
                    "down": { "uv": [0, 4, 2, 6], "texture": "#texture" }
                }
            }
        ]
    };

    const beacon: BlockModelDataType = {
        "parent": "block/block",
        "ambientocclusion": false,
        "textures": {
            "particle": "block/glass",
            "glass": "block/glass",
            "obsidian": "block/obsidian",
            "beacon": "block/beacon"
        },
        "elements": [
            {
                // "__comment": "Glass shell",
                "from": [0, 0, 0],
                "to": [16, 16, 16],
                "faces": {
                    "down": { "uv": [0, 0, 16, 16], "texture": "#glass" },
                    "up": { "uv": [0, 0, 16, 16], "texture": "#glass" },
                    "north": { "uv": [0, 0, 16, 16], "texture": "#glass" },
                    "south": { "uv": [0, 0, 16, 16], "texture": "#glass" },
                    "west": { "uv": [0, 0, 16, 16], "texture": "#glass" },
                    "east": { "uv": [0, 0, 16, 16], "texture": "#glass" }
                }
            },
            {
                // "__comment": "Obsidian base",
                "from": [2, 0.1, 2],
                "to": [14, 3, 14],
                "faces": {
                    "down": { "uv": [2, 2, 14, 14], "texture": "#obsidian" },
                    "up": { "uv": [2, 2, 14, 14], "texture": "#obsidian" },
                    "north": { "uv": [2, 13, 14, 16], "texture": "#obsidian" },
                    "south": { "uv": [2, 13, 14, 16], "texture": "#obsidian" },
                    "west": { "uv": [2, 13, 14, 16], "texture": "#obsidian" },
                    "east": { "uv": [2, 13, 14, 16], "texture": "#obsidian" }
                }
            },
            {
                // "__comment": "Inner beacon texture",
                "from": [3, 3, 3],
                "to": [13, 14, 13],
                "faces": {
                    "down": { "uv": [3, 3, 13, 13], "texture": "#beacon" },
                    "up": { "uv": [3, 3, 13, 13], "texture": "#beacon" },
                    "north": { "uv": [3, 2, 13, 13], "texture": "#beacon" },
                    "south": { "uv": [3, 2, 13, 13], "texture": "#beacon" },
                    "west": { "uv": [3, 2, 13, 13], "texture": "#beacon" },
                    "east": { "uv": [3, 2, 13, 13], "texture": "#beacon" }
                }
            }
        ]
    };


    const table: BlockModelDataType = {
        "parent": "minecraft:block/cube",
        "textures": {
            "particle": "minecraft:block/crafting_table_front",
            "north": "minecraft:block/crafting_table_front",
            "south": "minecraft:block/crafting_table_side",
            "east": "minecraft:block/crafting_table_side",
            "west": "minecraft:block/crafting_table_front",
            "up": "minecraft:block/crafting_table_top",
            "down": "minecraft:block/oak_planks"
        }
    };

    const honey: BlockModelDataType = {
        "parent": "block/block",
        "textures": {
            "particle": "block/honey_block_top",
            "down": "block/honey_block_bottom",
            "up": "block/honey_block_top",
            "side": "block/honey_block_side"
        },
        "elements": [
            {
                "from": [0, 0, 0],
                "to": [16, 16, 16],
                "faces": {
                    "down": { "texture": "#down", "cullface": "down" },
                    "up": { "texture": "#down", "cullface": "up" },
                    "north": { "texture": "#down", "cullface": "north" },
                    "south": { "texture": "#down", "cullface": "south" },
                    "west": { "texture": "#down", "cullface": "west" },
                    "east": { "texture": "#down", "cullface": "east" }
                }
            },
            {
                "from": [1, 1, 1],
                "to": [15, 15, 15],
                "faces": {
                    "down": { "uv": [1, 1, 15, 15], "texture": "#down" },
                    "up": { "uv": [1, 1, 15, 15], "texture": "#up" },
                    "north": { "uv": [1, 1, 15, 15], "texture": "#side" },
                    "south": { "uv": [1, 1, 15, 15], "texture": "#side" },
                    "west": { "uv": [1, 1, 15, 15], "texture": "#side" },
                    "east": { "uv": [1, 1, 15, 15], "texture": "#side" }
                }
            }
        ]
    };



    const sides = MCRender.Model.fromModelData(scene, table);

    // box is to the east for debug
    const box = BABYLON.MeshBuilder.CreateBox("box", {
        width: 16,
        height: 16,
        depth: 16,
    });
    box.position = new BABYLON.Vector3(32, 8, 8);
    const xMat = new BABYLON.StandardMaterial("xmat", scene);
    xMat.emissiveColor = new BABYLON.Color3(1, 0, 0);
    xMat.disableLighting = true;
    xMat.alpha = 0.1;
    box.material = xMat;

    // box is to the north for debug
    const box2 = BABYLON.MeshBuilder.CreateBox("box2", {
        width: 16,
        height: 16,
        depth: 16,
    }, scene);
    box2.position = new BABYLON.Vector3(8, 8, 32);
    const zMat = new BABYLON.StandardMaterial("xmat", scene);
    zMat.emissiveColor = new BABYLON.Color3(0, 0, 1);
    zMat.disableLighting = true;
    zMat.alpha = 0.1;

    getSkin("/resourcepacks/vanilla/assets/minecraft/textures/block/crafting_table_side.png").then((glass) => {
        const dtexture = new BABYLON.DynamicTexture("dt", 16, scene, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
        const ctx = dtexture.getContext();
        const test = { x: 16, y: 16, z: 0, w: 0 };
        const sx = Math.min(test.x, test.z);
        const sy = Math.min(test.y, test.w);
        const sw = Math.abs(test.z - test.x);
        const sh = Math.abs(test.w - test.y);
        const xAxis = Math.sign(test.z - test.x);
        const yAxis = Math.sign(test.w - test.y);
        ctx.scale(1 * xAxis, 1 * yAxis);
        ctx.drawImage(glass, sx, sy, sw, sh, 0, 0, 16 * xAxis, 16 * yAxis);
        // ctx.drawImage(glass, 0, 0);
        dtexture.hasAlpha = true;
        dtexture.update();
        dtexture.level = 0.5;

        const material = new BABYLON.StandardMaterial("aslkdajsdklajsd", scene);
        material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        material.useAlphaFromDiffuseTexture = true;
        material.diffuseTexture = dtexture;
        material.backFaceCulling = true;

        // box2.material = material;
    });

    box2.material = zMat;
}

const MCItemNew: FunctionComponent<MCItemProps> = (props) => {
    return (
        <div className="MCItem">
            <SceneComponent onSceneReady={onSceneReady} antialias={false} />
        </div>
    );
};

export default MCItemNew;


    // // create the box
    // const box = BABYLON.MeshBuilder.CreateBox("box", {
    //     width: 16,
    //     height: 16,
    //     depth: 16,
    // }, scene);
    // box.material = material;


    // // https://doc.babylonjs.com/divingDeeper/mesh/creation/custom/vertexNormals#table-of-unique-indices-positions-and-normals-for-box-with-minimum-vertices
    // const totalVertices = box.getTotalVertices();
    // box.subMeshes = [];
    // new BABYLON.SubMesh(3, 0, totalVertices, 0, 6, box);  // +z
    // new BABYLON.SubMesh(3, 0, totalVertices, 6, 6, box);  // -z
    // new BABYLON.SubMesh(0, 0, totalVertices, 12, 6, box); // +x
    // new BABYLON.SubMesh(3, 0, totalVertices, 18, 6, box); // -x
    // new BABYLON.SubMesh(1, 0, totalVertices, 24, 6, box); // +y
    // new BABYLON.SubMesh(3, 0, totalVertices, 30, 6, box); // -y