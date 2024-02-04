"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var apiHandlerWrapper_1 = require("./apiHandlerWrapper");
var react_query_1 = require("@tanstack/react-query");
function createApi(queryKey, handler, apiOptions) {
    var apiHandler = (0, apiHandlerWrapper_1.apiHandlerWrapper)(handler);
    var Types = {};
    // noinspection JSUnusedGlobalSymbols
    return {
        handler: apiHandler,
        Types: Types,
        useQuery: function (args, options) {
            var _a;
            return (0, react_query_1.useQuery)(__spreadArray([queryKey], (((_a = apiOptions === null || apiOptions === void 0 ? void 0 : apiOptions.queryKeyMap) === null || _a === void 0 ? void 0 : _a.call(apiOptions, args)) || []), true), (0, apiHandlerWrapper_1.queryFnWrapper)(queryKey, args), options);
        },
        useMutation: function (options) {
            var queryClient = (0, react_query_1.useQueryClient)();
            return (0, react_query_1.useMutation)([queryKey], (0, apiHandlerWrapper_1.mutationFnWrapper)(queryKey), __assign(__assign({}, options), { onMutate: function () {
                    var _a, _b, _c;
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return __awaiter(this, void 0, void 0, function () {
                        var _d, _e;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    _d = [{}];
                                    return [4 /*yield*/, ((_b = (_a = apiOptions === null || apiOptions === void 0 ? void 0 : apiOptions.mutationOptions) === null || _a === void 0 ? void 0 : _a.onMutate) === null || _b === void 0 ? void 0 : _b.call.apply(_b, __spreadArray(__spreadArray([_a], params, false), [queryClient], false)))];
                                case 1:
                                    _e = [__assign.apply(void 0, _d.concat([((_f.sent()) || {})]))];
                                    return [4 /*yield*/, ((_c = options === null || options === void 0 ? void 0 : options.onMutate) === null || _c === void 0 ? void 0 : _c.call.apply(_c, __spreadArray([options], params, false)))];
                                case 2: return [2 /*return*/, __assign.apply(void 0, _e.concat([((_f.sent()) || {})]))];
                            }
                        });
                    });
                }, onError: function () {
                    var _a, _b, _c;
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return __awaiter(this, void 0, void 0, function () {
                        var _d, _e;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    _d = [{}];
                                    return [4 /*yield*/, ((_b = (_a = apiOptions === null || apiOptions === void 0 ? void 0 : apiOptions.mutationOptions) === null || _a === void 0 ? void 0 : _a.onError) === null || _b === void 0 ? void 0 : _b.call.apply(_b, __spreadArray(__spreadArray([_a], params, false), [queryClient], false)))];
                                case 1:
                                    _e = [__assign.apply(void 0, _d.concat([((_f.sent()) || {})]))];
                                    return [4 /*yield*/, ((_c = options === null || options === void 0 ? void 0 : options.onError) === null || _c === void 0 ? void 0 : _c.call.apply(_c, __spreadArray([options], params, false)))];
                                case 2: return [2 /*return*/, __assign.apply(void 0, _e.concat([((_f.sent()) || {})]))];
                            }
                        });
                    });
                }, onSuccess: function () {
                    var _a, _b, _c;
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return __awaiter(this, void 0, void 0, function () {
                        var _d, _e;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    _d = [{}];
                                    return [4 /*yield*/, ((_b = (_a = apiOptions === null || apiOptions === void 0 ? void 0 : apiOptions.mutationOptions) === null || _a === void 0 ? void 0 : _a.onSuccess) === null || _b === void 0 ? void 0 : _b.call.apply(_b, __spreadArray(__spreadArray([_a], params, false), [queryClient], false)))];
                                case 1:
                                    _e = [__assign.apply(void 0, _d.concat([((_f.sent()) || {})]))];
                                    return [4 /*yield*/, ((_c = options === null || options === void 0 ? void 0 : options.onSuccess) === null || _c === void 0 ? void 0 : _c.call.apply(_c, __spreadArray([options], params, false)))];
                                case 2: return [2 /*return*/, __assign.apply(void 0, _e.concat([((_f.sent()) || {})]))];
                            }
                        });
                    });
                }, onSettled: function () {
                    var _a, _b, _c;
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return __awaiter(this, void 0, void 0, function () {
                        var _d, _e;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    _d = [{}];
                                    return [4 /*yield*/, ((_b = (_a = apiOptions === null || apiOptions === void 0 ? void 0 : apiOptions.mutationOptions) === null || _a === void 0 ? void 0 : _a.onSettled) === null || _b === void 0 ? void 0 : _b.call.apply(_b, __spreadArray(__spreadArray([_a], params, false), [queryClient], false)))];
                                case 1:
                                    _e = [__assign.apply(void 0, _d.concat([((_f.sent()) || {})]))];
                                    return [4 /*yield*/, ((_c = options === null || options === void 0 ? void 0 : options.onSettled) === null || _c === void 0 ? void 0 : _c.call.apply(_c, __spreadArray([options], params, false)))];
                                case 2: return [2 /*return*/, __assign.apply(void 0, _e.concat([((_f.sent()) || {})]))];
                            }
                        });
                    });
                } }));
        },
        invalidate: function (queryClient, args) {
            var _a;
            return queryClient.invalidateQueries(__spreadArray([
                queryKey
            ], (((_a = apiOptions === null || apiOptions === void 0 ? void 0 : apiOptions.queryKeyMap) === null || _a === void 0 ? void 0 : _a.call(apiOptions, args)) || []), true));
        },
        cancelQueries: function (queryClient, args) {
            var _a;
            return queryClient.cancelQueries(__spreadArray([
                queryKey
            ], (((_a = apiOptions === null || apiOptions === void 0 ? void 0 : apiOptions.queryKeyMap) === null || _a === void 0 ? void 0 : _a.call(apiOptions, args)) || []), true));
        },
        getQueryData: function (queryClient, args) {
            var _a;
            return queryClient.getQueryData(__spreadArray([
                queryKey
            ], (((_a = apiOptions === null || apiOptions === void 0 ? void 0 : apiOptions.queryKeyMap) === null || _a === void 0 ? void 0 : _a.call(apiOptions, args)) || []), true));
        },
        setQueryData: function (queryClient, updater, args) {
            var _a;
            return queryClient.setQueryData(__spreadArray([queryKey], (((_a = apiOptions === null || apiOptions === void 0 ? void 0 : apiOptions.queryKeyMap) === null || _a === void 0 ? void 0 : _a.call(apiOptions, args)) || []), true), updater);
        },
    };
}
exports.default = createApi;
