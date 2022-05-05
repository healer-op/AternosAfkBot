"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.equipItem = void 0;
const invUtil = __importStar(require("./invUtil"));
/**
 * Search for item in bot's inventory and equips it
 * @return {Boolean}   true if item equipped successfully, false if something went wrong
 */
const equipItem = (bot, itemId) => {
    if (itemId === undefined) {
        throw new Error("Item id is missing, provide item id as second argument");
    }
    var item = invUtil.findItemById(bot.inventory, itemId);
    var equipped = invUtil.equipped(bot.inventory, !bot.supportFeature("doesntHaveOffHandSlot"));
    if (!item) {
        return false;
    }
    const destination = invUtil.findArmorDestination(item);
    const destinationIndex = invUtil.findArmorDestinationIndex(item);
    if (destinationIndex < 0 || !destination) {
        return false;
    }
    const equippedArmor = equipped[destinationIndex];
    if (!equippedArmor || invUtil.isNewArmorBetter(equippedArmor, item)) {
        bot.equip(item, destination);
        return true;
    }
    return false;
};
exports.equipItem = equipItem;
