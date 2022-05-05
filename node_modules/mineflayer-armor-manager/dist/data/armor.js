"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offhandMaterials = exports.materials = exports.TypeDestination = void 0;
/** Mapping of values of which kind of armor goes to which slot */
var TypeDestination;
(function (TypeDestination) {
    TypeDestination["helmet"] = "head";
    TypeDestination["chestplate"] = "torso";
    TypeDestination["leggings"] = "legs";
    TypeDestination["boots"] = "feet";
    TypeDestination["off-hand"] = "off-hand";
})(TypeDestination = exports.TypeDestination || (exports.TypeDestination = {}));
/** Ranked list of armor materials from worst to best */
exports.materials = [
    "leather",
    "golden",
    "iron",
    "chainmail",
    "turtle",
    "diamond",
    "netherite",
];
/** Ranked list of offhand materials from worst to best */
exports.offhandMaterials = [
    "shield",
    "totem_of_undying"
];
