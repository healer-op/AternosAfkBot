"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const minecraft_data_1 = __importDefault(require("minecraft-data"));
const isArmor_1 = require("./lib/isArmor");
const equipItem_1 = require("./lib/equipItem");
const initializeBot = (bot, options) => {
    if (!bot) {
        throw new Error("Bot object is missing, provide mineflayer bot as first argument");
    }
    // @ts-expect-error
    bot.armorManager = {};
    // @ts-expect-error
    bot.armorManager.equipAll = function () {
        for (const item of bot.inventory.items()) {
            equipItem_1.equipItem(bot, item.type);
        }
    };
    let versionData;
    if (bot.version) {
        versionData = minecraft_data_1.default(bot.version);
    }
    // Version is only detected after bot logs in
    bot.on("login", function onLogin() {
        versionData = minecraft_data_1.default(bot.version);
    });
    bot.on("playerCollect", function onPlayerCollect(collector, item) {
        if (collector.username !== bot.username) {
            return;
        }
        try {
            const itemMetadata = item.metadata[item.metadata.length - 1];
            // In older versions blockId is used instead of itemId
            if (itemMetadata === 0) {
                // itemMetadata is 0, item no longer exists or is exp. Return
                return;
            }
            var itemId = "itemId" in itemMetadata
                ? itemMetadata.itemId
                : "blockId" in itemMetadata && itemMetadata.blockId;
            if (itemId && isArmor_1.isArmor(itemId, versionData)) {
                // Little delay to receive inventory
                setTimeout(() => equipItem_1.equipItem(bot, itemId), 100);
            }
        }
        catch (err) {
            if (options.logErrors) {
                console.log("Failed to retrieve block id, probably exp bottle", err);
            }
        }
    });
};
module.exports = initializeBot;
