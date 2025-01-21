namespace SpriteKind {
    export const coin = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    game.gameOver(true)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (duck.vy >= 0 && duck.vy < coyotejump || number_of_jumps == 1) {
        number_of_jumps += 1
        number_of_jumps = 1
        duck.vy = jump_speed
    }
})
function placeplayer () {
    for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
        duck = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . b 5 5 b . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 5 5 5 5 5 b . . . 
            . b b b b b 5 5 5 5 5 5 5 b . . 
            . b d 5 b 5 5 5 5 5 5 5 5 b . . 
            . . b 5 5 b 5 d 1 f 5 d 4 f . . 
            . . b d 5 5 b 1 f f 5 4 4 c . . 
            b b d b 5 5 5 d f b 4 4 4 4 b . 
            b d d c d 5 5 b 5 4 4 4 4 4 4 b 
            c d d d c c b 5 5 5 5 5 5 5 b . 
            c b d d d d d 5 5 5 5 5 5 5 b . 
            . c d d d d d d 5 5 5 5 5 d b . 
            . . c b d d d d d 5 5 5 b b . . 
            . . . c c c c c c c c b b . . . 
            `, SpriteKind.Player)
        controller.moveSprite(duck, player_speed, 0)
        tiles.placeOnTile(duck, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        scene.cameraFollowSprite(duck)
        duck.ay = gravity
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (sprite.x < otherSprite.x) {
        otherSprite.vx = 100
    } else {
        otherSprite.vx = -5
    }
    changeProjectile = false
    sprites.destroy(sprite)
})
function enemy_replacement () {
    for (let value of tiles.getTilesByType(assets.tile`myTile2`)) {
        ghost = sprites.create(img`
            ........................
            ........................
            ........................
            ........................
            ..........ffff..........
            ........ff1111ff........
            .......fb111111bf.......
            .......f11111111f.......
            ......fd11111111df......
            ......fd11111111df......
            ......fddd1111dddf......
            ......fbdbfddfbdbf......
            ......fcdcf11fcdcf......
            .......fb111111bf.......
            ......fffcdb1bdffff.....
            ....fc111cbfbfc111cf....
            ....f1b1b1ffff1b1b1f....
            ....fbfbffffffbfbfbf....
            .........ffffff.........
            ...........fff..........
            ........................
            ........................
            ........................
            ........................
            `, SpriteKind.Enemy)
        ghost.vx = enemy_speed
        ghost.setBounceOnWall(true)
        tiles.placeOnTile(ghost, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava1, function (sprite, location) {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.coin, function (sprite, otherSprite) {
    otherSprite.vy = -5
    sprites.destroy(otherSprite, effects.spray, 350)
    info.changeScoreBy(coin_value)
})
function coin_replacement () {
    for (let value of tiles.getTilesByType(assets.tile`myTile1`)) {
        coin = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 4 . . . . . . 
            . . . . . . . 4 4 4 4 . . . . . 
            . . . . 4 4 4 5 5 5 4 4 4 . . . 
            . . . . 4 5 5 5 1 5 5 5 4 . . . 
            . . . 4 4 5 5 5 1 5 5 5 4 4 . . 
            . . 4 4 5 5 5 1 1 1 5 5 5 4 4 . 
            . . 4 4 5 1 1 1 1 1 1 1 5 4 4 . 
            . . 4 4 5 5 5 1 1 1 5 5 5 4 4 . 
            . . . 4 4 5 5 5 1 5 5 5 4 4 . . 
            . . . . 4 5 5 5 1 5 5 5 4 . . . 
            . . . . 4 4 4 5 5 5 4 4 4 . . . 
            . . . . . . 4 4 4 4 4 . . . . . 
            . . . . . . . 4 4 4 . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.coin)
        tiles.placeOnTile(coin, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.y < otherSprite.y) {
        info.changeScoreBy(1)
        sprites.destroy(otherSprite, effects.fire, 500)
        mushroom = sprites.create(img`
            ..........bbbbbbbbbbbb..........
            .......bbb331111333333bbb.......
            .....cbb3331111113333333bbb.....
            ....cb33333311113333333111db....
            ...cb3111133333333333311111db...
            .ccbb1111113333333333311111ddcc.
            ccbbd1111113333333333331111ddbcc
            cbbbdd11111333333111333311ddbbbc
            cbbbdddd1133333311111333bbbbbbbc
            .cbbbddddbbb33331111dbbbbbbbbbc.
            .ccbbbbbbbbbbbbbbdddbbbbbbbbbcc.
            ...cccbbbbbbbbbbbbbbbbbbbbccc...
            ......cccccccccccccccccccc......
            ............bbbd11bb............
            ...........bbbdd111bb...........
            ..........bbbdddd11dbb..........
            `, SpriteKind.Projectile)
        mushroom.setScale(0.75, ScaleAnchor.Middle)
        mushroom.setPosition(otherSprite.x, otherSprite.y)
        mushroom.setBounceOnWall(true)
        sprites.destroy(otherSprite)
    } else {
        game.gameOver(false)
    }
})
let mushroom: Sprite = null
let coin: Sprite = null
let ghost: Sprite = null
let duck: Sprite = null
let coyotejump = 0
let changeProjectile = false
let number_of_jumps = 0
let coin_value = 0
let enemy_speed = 0
let player_speed = 0
let jump_speed = 0
let gravity = 0
gravity = 500
jump_speed = -250
player_speed = 100
enemy_speed = 30
coin_value = 1
number_of_jumps = 0
changeProjectile = false
coyotejump = 200
info.setScore(0)
tiles.setCurrentTilemap(tilemap`level2`)
placeplayer()
coin_replacement()
enemy_replacement()
game.onUpdate(function () {
    if (duck.vy < 0) {
        number_of_jumps = 0
    }
    if (changeProjectile) {
        if (!(duck.overlapsWith(mushroom))) {
            mushroom.setKind(SpriteKind.Enemy)
        }
    }
})
