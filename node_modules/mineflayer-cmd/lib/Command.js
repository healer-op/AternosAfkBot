"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(name, handler, help, usage) {
        this.flags = [];
        this.name = name;
        this.handler = handler;
        this.help = help;
        this.usage = usage;
    }
    addFlag(name, argCount, argNames = [], help = '') {
        while (argNames.length < argCount)
            argNames.push('arg' + argNames.length);
        this.flags.push(new Flag(name, argCount, argNames, help));
        return this;
    }
}
exports.Command = Command;
class Flag {
    constructor(name, argCount, argNames, help) {
        this.name = name;
        this.argCount = argCount;
        this.argNames = argNames;
        this.help = help;
    }
    get usage() {
        let usage = `--${this.name}`;
        for (let i = 0; i < this.argCount; i++)
            usage += ` <${this.argNames[i]}>`;
        usage += ` - ${this.help}`;
        return usage;
    }
}
