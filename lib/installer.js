"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adquiriSHACL_Play = void 0;
var core = require("@actions/core");
var exec_1 = require("@actions/exec");
var github = require("@actions/github");
var io = require("@actions/io");
var tc = require("@actions/tool-cache");
var path = require("path");
// Recuperer les parametres d'entrée
var constants_1 = require("./constants");
// Recuperer la version de SHACL-Play
function getLatestVersion() {
    return __awaiter(this, void 0, void 0, function () {
        var octokit, version;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    octokit = github.getOctokit(constants_1.GITHUB_TOKEN);
                    return [4 /*yield*/, octokit.rest.repos.getLatestRelease({
                            owner: "sparna-git",
                            repo: "shacl-play",
                        })];
                case 1:
                    version = (_a.sent()).data.tag_name;
                    core.debug('Get last version: ' + version);
                    return [2 /*return*/, version];
            }
        });
    });
}
function getVersion(version) {
    return __awaiter(this, void 0, void 0, function () {
        var latestVersion;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(version === "latest")) return [3 /*break*/, 2];
                    return [4 /*yield*/, getLatestVersion()];
                case 1:
                    latestVersion = _a.sent();
                    return [2 /*return*/, latestVersion];
                case 2: return [2 /*return*/, version];
            }
        });
    });
}
// download        
function composeDownloadUrl(version) {
    var url = "https://github.com/sparna-git/setup_shacl-play/releases/download/".concat(version, "/shacl-play-app-").concat(version, "-onejar.jar");
    return url;
}
function addPath(baseDir) {
    core.addPath(path.join(baseDir, 'shacl-play', 'releases'));
}
function adquiriSHACL_Play() {
    return __awaiter(this, void 0, void 0, function () {
        var version, downloadUrl, cachedPath, downloadedPath, cachedPath_1, shaclPlayPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getVersion(constants_1.SHACL_PLAY_VERSION)];
                case 1:
                    version = _a.sent();
                    downloadUrl = composeDownloadUrl(version);
                    cachedPath = tc.find("shacl-play", version);
                    core.debug('Actions function ini .......');
                    core.debug('Version SHACL-PLAY:' + version);
                    core.debug('URL SHACL-PLAY:' + downloadUrl);
                    if (!(cachedPath === "")) return [3 /*break*/, 4];
                    core.debug('Condition pour trouver la rute du fichier jar..........');
                    return [4 /*yield*/, tc.downloadTool(downloadUrl)];
                case 2:
                    downloadedPath = _a.sent();
                    core.debug('Dir downloaded Path ' + downloadedPath);
                    return [4 /*yield*/, tc.cacheDir(downloadedPath, "shacl-play", version)];
                case 3:
                    cachedPath_1 = _a.sent();
                    core.debug('Cached Path' + cachedPath_1);
                    addPath(cachedPath_1);
                    _a.label = 4;
                case 4: return [4 /*yield*/, io.which("shacl-play", true)];
                case 5:
                    shaclPlayPath = _a.sent();
                    core.debug('SHACL-Play Path ' + shaclPlayPath);
                    return [4 /*yield*/, (0, exec_1.exec)("java -jar ".concat(shaclPlayPath, " ").concat(version, " --help"))];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.adquiriSHACL_Play = adquiriSHACL_Play;
