const mineflayer = require('mineflayer')
const pvp = require('mineflayer-pvp').plugin
const {
    pathfinder,
    Movements,
    goals
} = require('mineflayer-pathfinder')
const armorManager = require('mineflayer-armor-manager')

const cmd = require('mineflayer-cmd').plugin
const fs = require('fs');
let rawdata = fs.readFileSync('config.json');
let data = JSON.parse(rawdata);
var lasttime = -1;
var moving = 0;
var first = false;
var connected = 0;
var actions = ['forward', 'back', 'left', 'right']
var lastaction;
var pi = 3.14159;
var moveinterval = 2; // 2 second movement interval
var maxrandom = 5; // 0-5 seconds added to movement interval (randomly)
var host = data["ip"];
var username = data["name"]
var nightskip = data["auto-night-skip"]

const bot = mineflayer.createBot({
    host: host,
    port: data["port"],
    username: username,
    logErrors: false
})
let death = 0;
let simp = 0;
let popularity = 0;
let pvpc = 0;

bot.loadPlugin(cmd)



bot.on('login', function () {
    console.log("Trying to login")
    if (data["login-enabled"] == "true") {
        bot.chat(data["login-cmd"])
        setTimeout(bot.chat(data["register-cmd"]), 2000);
       
    }
    for (let i = 0; i < 10; i++) {
        task(i);
    }
    console.log("Logged In")
    bot.chat("hello");
});

function task(i) {

    setTimeout(function () {
        if (first == true) {
            bot.chat("Support the Project https://github.com/healer-op/AternosAfkBot staring it")
            first = false;
        } else {
            bot.chat("Support the Project https://github.com/healer-op/AternosAfkBot staring it")
            first = true;
        }
    }, 3600000 * i);
}


bot.on('time', function (time) {


    if (nightskip == "true") {
        if (bot.time.timeOfDay >= 13000) {
            bot.chat('/time set day')
        }
    }
    if (connected < 1) {
        return;
    }
    if (lasttime < 0) {
        lasttime = bot.time.age;
    } else {
        var randomadd = Math.random() * maxrandom * 20;
        var interval = moveinterval * 20 + randomadd;
        if (bot.time.age - lasttime > interval) {
            if (moving == 1) {
                bot.setControlState(lastaction, false);
                moving = 0;
                lasttime = bot.time.age;
            } else {
                var yaw = Math.random() * pi - (0.5 * pi);
                var pitch = Math.random() * pi - (0.5 * pi);
                bot.look(yaw, pitch, false);
                lastaction = actions[Math.floor(Math.random() * actions.length)];
                bot.setControlState(lastaction, true);
                moving = 1;
                lasttime = bot.time.age;
                bot.activateItem();
            }
        }
    }
});

bot.on('spawn', function () {
    connected = 1;
});

bot.on('death', function () {
    death++;
    bot.emit("respawn")
});



bot.loadPlugin(pvp)
bot.loadPlugin(armorManager)
bot.loadPlugin(pathfinder)


bot.on('playerCollect', (collector, itemDrop) => {
    if (collector !== bot.entity) return

    setTimeout(() => {
        const sword = bot.inventory.items().find(item => item.name.includes('sword'))
        if (sword) bot.equip(sword, 'hand')
    }, 150)
})

bot.on('playerCollect', (collector, itemDrop) => {
    if (collector !== bot.entity) return

    setTimeout(() => {
        const shield = bot.inventory.items().find(item => item.name.includes('shield'))
        if (shield) bot.equip(shield, 'off-hand')
    }, 250)
})

let guardPos = null

function guardArea(pos) {
    guardPos = pos.clone()

    if (!bot.pvp.target) {
        moveToGuardPos()
    }
}

function stopGuarding() {
    guardPos = null
    bot.pvp.stop()
    bot.pathfinder.setGoal(null)
}

function moveToGuardPos() {
    const mcData = require('minecraft-data')(bot.version)
    bot.pathfinder.setMovements(new Movements(bot, mcData))
    bot.pathfinder.setGoal(new goals.GoalBlock(guardPos.x, guardPos.y, guardPos.z))
}

bot.on('stoppedAttacking', () => {
    if (guardPos) {
        moveToGuardPos()
    }
})

bot.on('physicTick', () => {
    if (bot.pvp.target) return
    if (bot.pathfinder.isMoving()) return

    const entity = bot.nearestEntity()
    if (entity) bot.lookAt(entity.position.offset(0, entity.height, 0))
})

bot.on('physicTick', () => {
    if (!guardPos) return

    const filter = e => e.type === 'mob' && e.position.distanceTo(bot.entity.position) < 16 &&
        e.mobType !== 'Armor Stand' // Mojang classifies armor stands as mobs for some reason?

    const entity = bot.nearestEntity(filter)
    if (entity) {
        bot.pvp.attack(entity)
    }
})

bot.on('chat', (username, message) => {
    if (username === bot.username) return
    if (message === `Hi ${bot.username}` || message === `hi ${bot.username}` || message === `${bot.username} Hi` || message === `${bot.username} hi` || message === `Hello ${bot.username}` || message === `hello ${bot.username}` || message === `${bot.username} Hello` || message === `${bot.username} hello`) {
        popularity++;
        bot.chat(`hi ${username}`)
    }

    if (message === `Hi ${bot.username} i am a girl`) {
        simp++;
        bot.chat(`hi ${username} my girl :smirk:`)
        bot.chat(`hru qt`)
        if (message === `i am fine`) {
            bot.chat(`Oh lets Take The Finest One For A Coffee Today`)
        }
    }

    if (message === `${bot.username} help` || message === `${bot.username} Help` || message === `help ${bot.username}` || message === `Help ${bot.username}`) {
        bot.chat(`hi ${username} Here Are my commands`)
        bot.chat(`===================================`)
        bot.chat(`figth me myname`)
        bot.chat(`Hi myname`)
        bot.chat(`==================================`)
        bot.chat(`Made by https://github.com/healer-op/AternosAfkBot`)
    }

    if (message === `Hi ${bot.username} i am a girl`) {
        bot.chat(`hi ${username} my girl :smirk:`)
        bot.chat(`hru qt`)
    }
    if (message === `guard ${bot.username}`) {
        const player = bot.players[username]

        if (!player) {
            bot.chat(`I can't see you. ${username} Master!`)
            return
        }

        bot.chat(`I will guard that location.${username}`)
        guardArea(player.entity.position)
    }

    if (message === `fight me ${bot.username}`) {
        const player = bot.players[username]

        if (!player) {
            bot.chat(`I can't see you. Keep Hiding ${username} Loser!`)
            return
        }

        bot.chat(`Prepare to fight! ${username}`)
        pvpc++;
        bot.pvp.attack(player.entity)
    }

    if (message === `stop`) {
        bot.chat('I will no longer guard this area.')
        stopGuarding()
    }


})

const port = process.env.PORT || 3000;

const express = require('express')
const app = express()

app.get('/', (req, res) => {

    res.send(`<b>${username}</b> is Online At <b>${host}</b> 
    <br>
    <br>
    Die Counter <b>${death}</b>
    <br>
    <br>
    Simp Counter <b>${simp}</b>
    <br>
    <br>
    Popularity Counter <b>${popularity}</b>
    <br>
    <br>
    Pvp Counter <b>${pvpc}</b>
    <br>
    <br>
    Made By <b>https://github.com/healer-op/AternosAfkBot</b>`)
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    console.log('MADE BY HEALER')
})
