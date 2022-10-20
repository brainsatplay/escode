import * as game from  "../../../components/phaser/game/index.js"
import * as player from  "../../../components/phaser/player.js"
import createMain from  "./scripts/player/create/main.js"
import update from "./scripts/player/update.js"
import create from "./scripts/create.js"
import * as keys from "../../../components/basic/keyboard.js"

export const esComponents = {
    keys: {
        esCompose: keys,
    },
    game: {
        esCompose: game,
        preload: {
            setBaseURL: "https://raw.githubusercontent.com/brainsatplay/escode/main/drafts/demos/phaser/assets",
            tilemapTiledJSON: [
                [
                    "map",
                    "map.json"
                ]
            ],
            spritesheet: [
                [
                    "tiles",
                    "tiles.png",
                    {
                        frameWidth: 70,
                        frameHeight: 70
                    }
                ]
            ],
            image: [
                [
                    "coin",
                    "coinGold.png"
                ]
            ],
            atlas: [
                [
                    "player",
                    "player.png",
                    "player.json"
                ]
            ]
        },
        config: {
            physics: {
                default: "arcade",
                arcade: {
                    gravity: {
                        y: 500
                    }
                }
            },
            scene: {
                key: "main",
                create: create
                // {
                //     esCompose: create
                // }
            }
        },
        esComponents: {
            player: {
                esCompose: player,
                position: {
                    x: 200,
                    y: 200
                },
                size: {
                    offset: {
                        height: -8
                    }
                },
                bounce: 0.2,
                collideWorldBounds: false,
                create: createMain,
                // {
                //     esCompose: createMain
                // },
                update: update 
                // {
                //     esCompose: update
                // }
            }
        }
    }
}


export const esListeners = {
        // Main Player Controls
        ['keys.ArrowUp']: {
            ['game.player.jump']: true,
        },
        ['keys.ArrowLeft']: {
            ['game.player.velocity']: {
                esBranch: [
                    {equals: true, value: -150},
                    {equals: false, value: 0},
                ]
            }
        },
        ['keys.ArrowRight']: {
            ['game.player.velocity']: {
                esBranch: [
                    {equals: true, value: 150},
                    {equals: false, value: 0},
                ]
            }
        },
}