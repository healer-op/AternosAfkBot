import { Bot } from "mineflayer";
/**
 * Search for item in bot's inventory and equips it
 * @return {Boolean}   true if item equipped successfully, false if something went wrong
 */
export declare const equipItem: (bot: Bot, itemId: number) => boolean;
