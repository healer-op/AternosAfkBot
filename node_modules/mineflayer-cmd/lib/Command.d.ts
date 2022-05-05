import { CommandHandler } from "./CommandManager";
export declare class Command {
    readonly name: string;
    readonly handler: CommandHandler;
    readonly help: string;
    readonly flags: Flag[];
    readonly usage: string;
    constructor(name: string, handler: CommandHandler, help: string, usage: string);
    addFlag(name: string, argCount: number, argNames?: string[], help?: string): Command;
}
declare class Flag {
    readonly name: string;
    readonly argCount: number;
    readonly argNames: string[];
    readonly help: string;
    constructor(name: string, argCount: number, argNames: string[], help: string);
    get usage(): string;
}
export {};
