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
exports.getDamageMultiplier = exports.getCooldown = exports.getAttackSpeed = void 0;
const attackSpeeds = __importStar(require("./AttackSpeeds.json"));
function getAttackSpeed(weaponName) {
    if (!weaponName)
        return attackSpeeds.other;
    return attackSpeeds[weaponName] || attackSpeeds.other;
}
exports.getAttackSpeed = getAttackSpeed;
function clamp(x, min, max) {
    if (x < min)
        return min;
    if (x > max)
        return max;
    return x;
}
function getCooldown(weaponName) {
    const speed = getAttackSpeed(weaponName);
    return Math.floor(1 / speed * 20);
}
exports.getCooldown = getCooldown;
function getDamageMultiplier(weaponName) {
    const speed = getAttackSpeed(weaponName);
    const damageMul = 0.2 + Math.pow((speed + 0.5) / (1 / speed * 20), 2) * 0.8;
    return clamp(damageMul, 0.2, 1.0);
}
exports.getDamageMultiplier = getDamageMultiplier;
