import appInfo from '../../../../js/components/demos/phaser/index.esc.json' assert {type: "json"}
// import phaserInfo from '../../../../phaser/src/index.esc.json' assert {type: "json"}

// import mainPkg from '../../../../phaser/package.json'  assert {type: "json"}
// import phaserPkg from '../../../../phaser/src/package.json'  assert {type: "json"}
// import * as game from  '../../../../js/components/components/phaser/game/index.js'
// import * as cursors from  '../../../../js/components/components/phaser/cursors.js'
// import * as player from  '../../../../js/components/components/phaser/player.js'

// import * as create from  '../../../../js/components/demos/phaser/scripts/create.js'
// import * as createMain from  '../../../../js/components/demos/phaser/scripts/player/create/main.js'
// import * as createCompanion from  '../../../../js/components/demos/phaser/scripts/player/create/companion.js'

// import * as updatePlayer from  '../../../../js/components/demos/phaser/scripts/player/update.js'

const options = {
    relativeTo: import.meta.url,
    filesystem: {
        // 'package.json': mainPkg,
        // 'src/package.json': phaserPkg,
        // 'src/index.esc.json': phaserInfo,
        // 'src/plugins/game/index.js': game,
        // 'src/plugins/player/index.js': player,
        // 'src/plugins/cursors/index.js': cursors,
        // 'scripts/create.js': create,
        // 'src/scripts/player/create/main.js': createMain,
        // 'src/scripts/player/create/companion.js': createCompanion,
        // 'src/scripts/player/update.js': updatePlayer,
    }
}

export {
    appInfo,
    options
}