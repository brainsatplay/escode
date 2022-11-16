
import * as phaser from '../../index.esc'
import * as average from "../../../../../../components/basic/average.js"
import * as threshold from "../../../../../../components/basic/threshold.js"
import * as signal from "../../../signal/index.esc"
import * as devices from "../../../../../../components/devices/ui/index.esc.js"
import * as filter from "../../../../../../components/devices/extensions/filter/index.esc.js"

// ----------------------------- Base Component -----------------------------
export const __compose = phaser

// export const __editor = true

// ----------------------------- Will Merge In -----------------------------
export const __attributes = { style: { position: 'relative' } }

export const __listeners = {
    ['game.player.jump']: {
        threshold: true
    },
    threshold: 'average',
    average: {
        'devices.output': {
            __format: (o) => { 
                const res = o[0]
                if (!res) return
                else return [res] // First channel only
            }
        }
    },
    ['signal.plot']: {
        'devices.output': true
    },
}

export const __children = {

    // ---------- Blink Detector ----------
    average: {
        maxBufferSize: 20,
        buffer: [],
        __compose: average,
    },
    threshold: {
        value: 300,
        __compose: threshold,
    },

    devices: {
        __compose: [filter, devices],
    },

    signal: {
        __compose: signal,
        __attributes: {
            style: {
                position: "absolute",
                bottom: "15px",
                right: "15px",
                width: "250px",
                height: "150px",
                zIndex: 1,
            }
        },

        __children: {

            devices: undefined, // unsetting device

            signalCanvas: {
                __attributes: {
                    style: {
                        width: '100%',
                        height: '150px'
                    }
                },
            },
            overlayCanvas: {
                __attributes: {
                    style: {
                        width: '100%',
                        height: '150px'
                    }
                },
            },
        },
        __listeners: {
            'plot': false
        }
    },
}

// {
//     "__children": {
//         "average": {
//             "__compose": "../../../plugins/average.js",
//             "children": {
//                 "threshold": true
//             }
//         },
//         "threshold": {
//             "__compose": "../../../plugins/threshold.js",
//             "threshold": 500,
//             "children": {
//                 "ui.game.player.jump": true
//             }
//         },
//         "synthetic": {
//             "__compose": "https://raw.githubusercontent.com/brainsatplay/escode/main/components/drafts/old/devices/synthetic/index.js",
//             "children": {
//                 "datastreams.start": true
//             }
//         },
//         "ganglion": {
//             "__compose": "https://raw.githubusercontent.com/brainsatplay/escode/main/components/drafts/old/devices/ganglion/index.js",
//             "children": {
//                 "datastreams.start": true
//             }
//         },
//         "muse": {
//             "__compose": "https://raw.githubusercontent.com/brainsatplay/escode/main/components/drafts/old/devices/muse/index.js",
//             "children": {
//                 "datastreams.start": true
//             }
//         },
//         "datastreams": {
//             "__compose": "https://raw.githubusercontent.com/brainsatplay/escode/main/components/drafts/old/datastreams/index.esc.json",
//             "children": {
//                 "ui.timeseries": true,
//                 "average": true
//             }
//         },
//         "ui": {
//             "tagName": "div",
//             "style": {
//                 "position": "absolute",
//                 "top": "0px",
//                 "left": "0px",
//                 "width": "100%",
//                 "height": "100%"
//             },
//             "__children": {
//                 "timeseries": {
//                     "style": {
//                         "position": "absolute",
//                         "bottom": "15px",
//                         "right": "15px",
//                         "width": "250px",
//                         "height": "150px"
//                     },
//                     "__compose": "https://raw.githubusercontent.com/brainsatplay/escode/main/components/drafts/old/timeseries/index.js"
//                 },
//                 "button_1": {
//                     "attributes": {
//                         "innerHTML": "Start synthetic data generation"
//                     },
//                     "children": {
//                         "synthetic": true
//                     },
//                     "__compose": "https://raw.githubusercontent.com/brainsatplay/escode/main/components/ui/button.js"
//                 },
//                 "button_2": {
//                     "attributes": {
//                         "innerHTML": "Connect Ganglion"
//                     },
//                     "__compose": "https://raw.githubusercontent.com/brainsatplay/escode/main/components/ui/button.js",
//                     "children": {
//                         "ganglion": true
//                     }
//                 },
//                 "button_3": {
//                     "attributes": {
//                         "innerHTML": "Connect Muse"
//                     },
//                     "__compose": "https://raw.githubusercontent.com/brainsatplay/escode/main/components/ui/button.js",
//                     "children": {
//                         "muse": true
//                     }
//                 },
//                 "jump": {
//                     "attributes": {
//                         "innerHTML": "Jump Main Character"
//                     },
//                     "__compose": "https://raw.githubusercontent.com/brainsatplay/escode/main/components/ui/button.js",
//                     "children": {
//                         "ui.game.player.jump": true
//                     }
//                 },
//                 "companionJump": {
//                     "attributes": {
//                         "innerHTML": "Jump Companion"
//                     },
//                     "__compose": "https://raw.githubusercontent.com/brainsatplay/escode/main/components/ui/button.js",
//                     "children": {
//                         "ui.game.companion.jump": true
//                     }
//                 },
//                 "game": {
//                     "__compose": "https://raw.githubusercontent.com/brainsatplay/escode/main/components/phaser/game/index.js",
//                             "preload": {
//                                 "setBaseURL": "https://raw.githubusercontent.com/brainsatplay/escode/main/apps/showcase/demos/phaser/assets",
//                                 "tilemapTiledJSON": [
//                                     [
//                                         "map",
//                                         "map.json"
//                                     ]
//                                 ],
//                                 "spritesheet": [
//                                     [
//                                         "tiles",
//                                         "tiles.png",
//                                         {
//                                             "frameWidth": 70,
//                                             "frameHeight": 70
//                                         }
//                                     ]
//                                 ],
//                                 "image": [
//                                     [
//                                         "coin",
//                                         "coinGold.png"
//                                     ]
//                                 ],
//                                 "atlas": [
//                                     [
//                                         "player",
//                                         "player.png",
//                                         "player.json"
//                                     ]
//                                 ]
//                             },
//                             "config": {
//                                 "physics": {
//                                     "default": "arcade",
//                                     "arcade": {
//                                         "gravity": {
//                                             "y": 500
//                                         }
//                                     }
//                                 },
//                                 "scene": {
//                                     "key": "main",
//                                     "create": {
//                                         "__compose": "https://raw.githubusercontent.com/brainsatplay/escode/main/drafts/demos/phaser/scripts/create.js"
//                                     }
//                                 }
//                             },
//                             "__children": {
//                                 "cursors": {
//                                     "__compose": "https://raw.githubusercontent.com/brainsatplay/escode/main/components/phaser/cursors.js"
//                                 },
//                                 "player": {
//                                     "__compose": "https://raw.githubusercontent.com/brainsatplay/escode/main/components/phaser/player.js",
//                                     "position": {
//                                         "x": 200,
//                                         "y": 200
//                                     },
//                                     "size": {
//                                         "offset": {
//                                             "height": -8
//                                         }
//                                     },
//                                     "bounce": 0.2,
//                                     "collideWorldBounds": false,
//                                     "create": {
//                                         "__compose": "https://raw.githubusercontent.com/brainsatplay/escode/main/drafts/demos/phaser/scripts/player/create/main.js"
//                                     },
//                                     "update": {
//                                         "__compose": "https://raw.githubusercontent.com/brainsatplay/escode/main/drafts/demos/phaser/scripts/player/update.js"
//                                     }
//                                 },
//                                 "companion": {
//                                     "__compose": "https://raw.githubusercontent.com/brainsatplay/escode/main/components/phaser/player.js",
//                                     "position": {
//                                         "x": 100,
//                                         "y": 200
//                                     },
//                                     "size": {
//                                         "offset": {
//                                             "height": -8
//                                         }
//                                     },
//                                     "bounce": 0.2,
//                                     "collideWorldBounds": false,
//                                     "create": {
//                                         "__compose": "https://raw.githubusercontent.com/brainsatplay/escode/main/drafts/demos/phaser/scripts/player/create/companion.js"
//                                     },
//                                     "update": {
//                                         "__compose": "https://raw.githubusercontent.com/brainsatplay/escode/main/drafts/demos/phaser/scripts/player/update.js"
//                                     }
//                                 }
//                             }
//                         }
//             }
//         }
//     },
    
//     "listeners": {
//         "datastreams.start": {
//             "ui.timeseries": true,
//             "average": true
//         }
//     }
// }