"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArmor = void 0;
const armor_1 = require("../data/armor");
const armorTypes = Object.keys(armor_1.TypeDestination);
const isArmor = (itemId, versionData) => {
    const item = versionData.findItemOrBlockById(itemId);
    return item && (armorTypes.some((type) => item.name.endsWith(type))
        || armor_1.offhandMaterials.some((type) => item.name === type));
};
exports.isArmor = isArmor;
