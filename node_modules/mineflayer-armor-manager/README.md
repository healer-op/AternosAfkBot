# ArmorManager

Plugin for [MineFlayer](https://github.com/PrismarineJS/mineflayer), that makes bot automatically equip better armor.

# Demonstration

![Footage](/footage.gif)

## Installing

### Prerequisites

- NodeJS ^12.18
- YARN (Optional)

### As dependency

If using **NPM**:

`npm install mineflayer-armor-manager`

If using **YARN**:

`yarn add mineflayer-armor-manager`

## Usage

```js
const armorManager = require('mineflayer-armor-manager')
const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  username: 'Player',
  host: 'localhost',
  port: 25565
});

bot.loadPlugin(armorManager);
```

To the best possible equipment in the bot's inventory:
```js
bot.armorManager.equipAll()
```

## License

MIT © [Konstantin Azizov](http://g07cha.github.io)
