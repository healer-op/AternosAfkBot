"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equipped = exports.isNewArmorBetter = exports.findArmorDestination = exports.findArmorDestinationIndex = exports.findItemById = void 0;
const armor_1 = require("../data/armor");
const rambda_1 = require("rambda");
const types = rambda_1.keys(armor_1.TypeDestination);
const findItemById = (inventory, itemId) => inventory.slots.find((item) => item && item.type === itemId);
exports.findItemById = findItemById;
const findArmorDestinationIndex = (item) => {
    let index = types.findIndex((type) => item.name.endsWith(type));
    if (index < 0)
        index = armor_1.offhandMaterials.some(mat => item.name === mat) ? 4 : -1;
    return index;
};
exports.findArmorDestinationIndex = findArmorDestinationIndex;
const findArmorDestination = (item) => {
    let type = types.find((type) => item.name.endsWith(type));
    if (!type && armor_1.offhandMaterials.some(mat => item.name === mat))
        type = 'off-hand';
    return type && armor_1.TypeDestination[type];
};
exports.findArmorDestination = findArmorDestination;
const getRank = (item) => {
    const index = armor_1.materials.findIndex(mat => item.name.startsWith(mat));
    if (index >= 0)
        return index;
    return armor_1.offhandMaterials.findIndex(mat => item.name === mat);
};
const isNewArmorBetter = (oldArmor, newArmor) => {
    var oldArmorRank = getRank(oldArmor);
    var newArmorRank = getRank(newArmor);
    return newArmorRank > oldArmorRank;
};
exports.isNewArmorBetter = isNewArmorBetter;
/**
 * Get equipped items(workaround because of https://github.com/PrismarineJS/mineflayer/issues/397)
 */
const equipped = (inventory, supportsOffhand) => inventory.slots.slice(5, 9).concat(supportsOffhand ? [inventory.slots[45]] : []);
exports.equipped = equipped;
