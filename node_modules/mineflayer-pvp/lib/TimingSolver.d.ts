import { Bot } from "mineflayer";
/**
 * A solver that can be used to determine the number of ticks to wait
 * aftter an attack before attempting another attack.
 */
export interface TimingSolver {
    /**
     * Sampled right after an attack to get the number of ticks to wait
     * before the next attack.
     *
     * @param bot - The bot preforming the action.
     */
    getTicks(bot: Bot): number;
}
/**
 * A timing solver that simply return a random number of ticks between
 * a min and max value.
 */
export declare class RandomTicks implements TimingSolver {
    readonly min: number;
    readonly max: number;
    constructor(min?: number, max?: number);
    /** @inheritdoc */
    getTicks(): number;
}
/**
 * A timing solver that tries to maximize the damage with a configurable
 * random offset. This is identical to using the RandomTicks timing solver
 * but with the weapons's default cooldown added to it.
 */
export declare class MaxDamageOffset implements TimingSolver {
    readonly min: number;
    readonly max: number;
    constructor(min?: number, max?: number);
    /** @inheritdoc */
    getTicks(bot: Bot): number;
}
