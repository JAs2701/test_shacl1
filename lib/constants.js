"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHACL_PLAY_VERSION = exports.GITHUB_TOKEN = void 0;
var core = require("@actions/core");
exports.GITHUB_TOKEN = core.getInput("github-token");
exports.SHACL_PLAY_VERSION = core.getInput("shacl-play-version");
console.log('Version using core.getInput', exports.SHACL_PLAY_VERSION);
console.log('Version using tag', exports.SHACL_PLAY_VERSION);
