/* Elements common to all models */
namespace Underlayer {
    export const head: ElementDataType = {
        "from": [4, 24, 4],
        "to": [12, 32, 12],
        "faces": {
            "east": { "uv": [0, 8, 8, 16], "texture": "#skin" },
            "north": { "uv": [8, 8, 16, 16], "texture": "#skin" },
            "west": { "uv": [16, 8, 24, 16], "texture": "#skin" },
            "south": { "uv": [24, 8, 32, 16], "texture": "#skin" },
            "up": { "uv": [8, 0, 16, 8], "texture": "#skin", },
            "down": { "uv": [16, 0, 24, 8], "texture": "#skin", }
        }
    };

    export const torso: ElementDataType = {
        "from": [4, 12, 6],
        "to": [12, 24, 10],
        "faces": {
            "east": { "uv": [16, 20, 20, 32], "texture": "#skin" },
            "north": { "uv": [20, 20, 28, 32], "texture": "#skin" },
            "west": { "uv": [28, 20, 32, 32], "texture": "#skin" },
            "south": { "uv": [32, 20, 40, 32], "texture": "#skin" },
            "up": { "uv": [20, 16, 28, 20], "texture": "#skin" },
            "down": { "uv": [28, 16, 36, 20], "texture": "#skin" },
        }
    };

    export const rightLeg: ElementDataType = {
        "from": [8, 0, 6],
        "to": [12, 12, 10],
        "faces": {
            "east": { "uv": [0, 20, 4, 32], "texture": "#skin" },
            "north": { "uv": [4, 20, 8, 32], "texture": "#skin" },
            "west": { "uv": [8, 20, 12, 32], "texture": "#skin" },
            "south": { "uv": [12, 20, 16, 32], "texture": "#skin" },
            "up": { "uv": [4, 16, 8, 20], "texture": "#skin" },
            "down": { "uv": [8, 16, 12, 20], "texture": "#skin" },
        }
    };

    export namespace Current {
        export const leftLeg: ElementDataType = {
            "from": [4, 0, 6],
            "to": [8, 12, 10],
            "faces": {
                "east": { "uv": [16, 52, 20, 64], "texture": "#skin" },
                "north": { "uv": [20, 52, 24, 64], "texture": "#skin" },
                "west": { "uv": [24, 52, 28, 64], "texture": "#skin" },
                "south": { "uv": [28, 52, 32, 64], "texture": "#skin" },
                "up": { "uv": [20, 48, 24, 52], "texture": "#skin" },
                "down": { "uv": [24, 48, 28, 52], "texture": "#skin" },
            }
        };
    }

    export namespace Legacy {
        export const leftLeg: ElementDataType = {
            "from": [4, 0, 6],
            "to": [8, 12, 10],
            "faces": {
                "east": { "uv": [12, 20, 8, 32], "texture": "#skin" },
                "north": { "uv": [8, 20, 4, 32], "texture": "#skin" },
                "west": { "uv": [4, 20, 8, 32], "texture": "#skin" },
                "south": { "uv": [16, 20, 12, 32], "texture": "#skin" },
                "up": { "uv": [8, 16, 4, 20], "texture": "#skin" },
                "down": { "uv": [12, 16, 8, 20], "texture": "#skin" },
            }
        };
    }

    export namespace Steve {
        export const rightArm: ElementDataType = {
            "from": [12, 12, 6],
            "to": [16, 24, 10],
            "faces": {
                "east": { "uv": [40, 20, 44, 32], "texture": "#skin" },
                "north": { "uv": [44, 20, 48, 32], "texture": "#skin" },
                "west": { "uv": [48, 20, 52, 32], "texture": "#skin" },
                "south": { "uv": [52, 20, 56, 32], "texture": "#skin" },
                "up": { "uv": [44, 16, 48, 20], "texture": "#skin" },
                "down": { "uv": [48, 16, 52, 20], "texture": "#skin" },
            }
        };

        export namespace Current {
            export const leftArm: ElementDataType = {
                "from": [0, 12, 6],
                "to": [4, 24, 10],
                "faces": {
                    "east": { "uv": [32, 52, 36, 64], "texture": "#skin" },
                    "north": { "uv": [36, 52, 40, 64], "texture": "#skin" },
                    "west": { "uv": [40, 52, 44, 64], "texture": "#skin" },
                    "south": { "uv": [44, 52, 48, 64], "texture": "#skin" },
                    "up": { "uv": [36, 48, 40, 52], "texture": "#skin" },
                    "down": { "uv": [40, 48, 44, 52], "texture": "#skin" },
                }
            };
        }

        export namespace Legacy {
            export const leftArm: ElementDataType = {
                "from": [0, 12, 6],
                "to": [4, 24, 10],
                "faces": {
                    "east": { "uv": [52, 20, 48, 32], "texture": "#skin" },
                    "north": { "uv": [48, 20, 44, 32], "texture": "#skin" },
                    "west": { "uv": [44, 20, 40, 32], "texture": "#skin" },
                    "south": { "uv": [56, 20, 52, 32], "texture": "#skin" },
                    "up": { "uv": [48, 16, 44, 20], "texture": "#skin" },
                    "down": { "uv": [52, 16, 48, 20], "texture": "#skin" },
                }
            };
        }
    }

    export namespace Alex {
        export const rightArm: ElementDataType = {
            "from": [12, 12, 6],
            "to": [15, 24, 10],
            "faces": {
                "east": { "uv": [40, 20, 44, 32], "texture": "#skin" },
                "north": { "uv": [44, 20, 47, 32], "texture": "#skin" },
                "west": { "uv": [47, 20, 51, 32], "texture": "#skin" },
                "south": { "uv": [51, 20, 54, 32], "texture": "#skin" },
                "up": { "uv": [44, 16, 47, 20], "texture": "#skin" },
                "down": { "uv": [47, 16, 50, 20], "texture": "#skin" },
            }
        };

        export const leftArm: ElementDataType = {
            "from": [1, 12, 6],
            "to": [4, 24, 10],
            "faces": {
                "east": { "uv": [32, 52, 36, 64], "texture": "#skin" },
                "north": { "uv": [36, 52, 39, 64], "texture": "#skin" },
                "west": { "uv": [39, 52, 43, 64], "texture": "#skin" },
                "south": { "uv": [43, 52, 46, 64], "texture": "#skin" },
                "up": { "uv": [36, 48, 39, 52], "texture": "#skin" },
                "down": { "uv": [39, 48, 42, 52], "texture": "#skin" },
            }
        };
    }
}

namespace Overlayer {
    export const head: ElementDataType = {
        "__comment": "overlayer head",
        "from": [3.75, 23.75, 3.75],
        "to": [12.25, 32.25, 12.25],
        "faces": {
            "east": { "uv": [32, 8, 40, 16], "texture": "#skin" },
            "north": { "uv": [40, 8, 48, 16], "texture": "#skin" },
            "west": { "uv": [48, 8, 56, 16], "texture": "#skin" },
            "south": { "uv": [56, 8, 64, 16], "texture": "#skin" },
            "up": { "uv": [40, 0, 48, 8], "texture": "#skin", },
            "down": { "uv": [48, 0, 56, 8], "texture": "#skin", }
        }
    };

    export const torso: ElementDataType = {
        "__comment": "overlayer torso",
        "from": [3.875, 11.875, 5.875],
        "to": [12.125, 24.125, 10.125],
        "faces": {
            "east": { "uv": [16, 36, 20, 48], "texture": "#skin" },
            "north": { "uv": [20, 36, 28, 48], "texture": "#skin" },
            "west": { "uv": [28, 36, 32, 48], "texture": "#skin" },
            "south": { "uv": [32, 36, 40, 48], "texture": "#skin" },
            "up": { "uv": [20, 32, 28, 36], "texture": "#skin" },
            "down": { "uv": [28, 32, 36, 36], "texture": "#skin" },
        }
    };

    export const rightLeg: ElementDataType = {
        "from": [7.875, -0.125, 5.875],
        "to": [12.125, 12.125, 10.125],
        "faces": {
            "east": { "uv": [0, 36, 4, 48], "texture": "#skin" },
            "north": { "uv": [4, 36, 8, 48], "texture": "#skin" },
            "west": { "uv": [8, 36, 12, 48], "texture": "#skin" },
            "south": { "uv": [12, 36, 16, 48], "texture": "#skin" },
            "up": { "uv": [4, 32, 8, 36], "texture": "#skin" },
            "down": { "uv": [8, 32, 12, 36], "texture": "#skin" },
        }
    };

    export namespace Current {
        export const leftLeg: ElementDataType = {
            "from": [3.875, -0.125, 5.875],
            "to": [8.125, 12.125, 10.125],
            "faces": {
                "east": { "uv": [0, 52, 4, 64], "texture": "#skin" },
                "north": { "uv": [4, 52, 8, 64], "texture": "#skin" },
                "west": { "uv": [8, 52, 12, 64], "texture": "#skin" },
                "south": { "uv": [12, 52, 16, 64], "texture": "#skin" },
                "up": { "uv": [4, 48, 8, 52], "texture": "#skin" },
                "down": { "uv": [8, 48, 12, 52], "texture": "#skin" },
            }
        };
    }

    export namespace Steve {
        export const rightArm: ElementDataType = {
            "from": [11.875, 11.875, 5.875],
            "to": [16.125, 24.125, 10.125],
            "faces": {
                "east": { "uv": [40, 36, 44, 48], "texture": "#skin" },
                "north": { "uv": [44, 36, 48, 48], "texture": "#skin" },
                "west": { "uv": [48, 36, 52, 48], "texture": "#skin" },
                "south": { "uv": [52, 36, 56, 48], "texture": "#skin" },
                "up": { "uv": [44, 32, 48, 36], "texture": "#skin" },
                "down": { "uv": [48, 32, 52, 36], "texture": "#skin" },
            }
        };

        export namespace Current {
            export const leftArm: ElementDataType = {
                "from": [-0.125, 11.875, 5.875],
                "to": [4.125, 24.125, 10.125],
                "faces": {
                    "east": { "uv": [48, 52, 52, 64], "texture": "#skin" },
                    "north": { "uv": [52, 52, 56, 64], "texture": "#skin" },
                    "west": { "uv": [56, 52, 60, 64], "texture": "#skin" },
                    "south": { "uv": [60, 52, 64, 64], "texture": "#skin" },
                    "up": { "uv": [52, 48, 56, 52], "texture": "#skin" },
                    "down": { "uv": [56, 48, 60, 52], "texture": "#skin" },
                }
            };
        }
    }

    export namespace Alex {
        export const rightArm: ElementDataType = {
            "from": [11.875, 11.875, 5.875],
            "to": [15.125, 24.125, 10.125],
            "faces": {
                "east": { "uv": [40, 36, 44, 48], "texture": "#skin" },
                "north": { "uv": [44, 36, 47, 48], "texture": "#skin" },
                "west": { "uv": [47, 36, 51, 48], "texture": "#skin" },
                "south": { "uv": [51, 36, 54, 48], "texture": "#skin" },
                "up": { "uv": [44, 32, 47, 36], "texture": "#skin" },
                "down": { "uv": [47, 32, 50, 36], "texture": "#skin" },
            }
        };

        export const leftArm: ElementDataType = {
            "from": [0.875, 11.875, 5.875],
            "to": [4.125, 24.125, 10.125],
            "faces": {
                "east": { "uv": [48, 52, 52, 64], "texture": "#skin" },
                "north": { "uv": [52, 52, 55, 64], "texture": "#skin" },
                "west": { "uv": [55, 52, 59, 64], "texture": "#skin" },
                "south": { "uv": [59, 52, 62, 64], "texture": "#skin" },
                "up": { "uv": [52, 48, 55, 52], "texture": "#skin" },
                "down": { "uv": [55, 48, 58, 52], "texture": "#skin" },
            }
        };
    }
}


export const modelSteveCurrent: PlayerModelType = {
    elements: [
        Underlayer.head,
        Underlayer.torso,
        Underlayer.Steve.rightArm,
        Underlayer.Steve.Current.leftArm,
        Underlayer.rightLeg,
        Underlayer.Current.leftLeg,

        Overlayer.head,
        Overlayer.torso,
        Overlayer.Steve.rightArm,
        Overlayer.Steve.Current.leftArm,
        Overlayer.rightLeg,
        Overlayer.Current.leftLeg,
    ]
};

export const modelSteveLegacy: PlayerModelType = {
    elements: [
        Underlayer.head,
        Underlayer.torso,
        Underlayer.Steve.rightArm,
        Underlayer.Steve.Legacy.leftArm,
        Underlayer.rightLeg,
        Underlayer.Legacy.leftLeg,

        Overlayer.head,
        Overlayer.torso,
    ]
};

export const modelAlex: PlayerModelType = {
    elements: [
        Underlayer.head,
        Underlayer.torso,
        Underlayer.Alex.rightArm,
        Underlayer.Alex.leftArm,
        Underlayer.rightLeg,
        Underlayer.Current.leftLeg,

        Overlayer.head,
        Overlayer.torso,
        Overlayer.Alex.rightArm,
        Overlayer.Alex.leftArm,
        Overlayer.rightLeg,
        Overlayer.Current.leftLeg,
    ]
};