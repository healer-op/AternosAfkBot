import { TypeDestination } from "../data/armor";
import { Item } from "prismarine-item";
import { Window } from "prismarine-windows";
export declare const findItemById: (inventory: {
    slots: readonly Item[];
}, itemId: number) => Item | undefined;
export declare const findArmorDestinationIndex: (item: Item) => number;
export declare const findArmorDestination: (item: Item) => TypeDestination | undefined;
export declare const isNewArmorBetter: (oldArmor: Item, newArmor: Item) => boolean;
/**
 * Get equipped items(workaround because of https://github.com/PrismarineJS/mineflayer/issues/397)
 */
export declare const equipped: (inventory: Window, supportsOffhand: boolean) => readonly Item[];
