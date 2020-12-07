"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioSchema = void 0;
var mongoose_1 = require("mongoose");
var crypto_1 = __importDefault(require("crypto"));
var fonoSchema = new mongoose_1.Schema({
    fon_num: {
        type: String,
        required: true
    },
    fon_ope: {
        type: String,
        required: true
    }
});
var visitaSchema = new mongoose_1.Schema({
    vst_fec: {
        type: String,
        min: '2010-01-01',
    },
    vst_sed: {
        type: String
    }
});
exports.usuarioSchema = new mongoose_1.Schema({
    usu_nom: {
        type: String,
        required: true
    },
    usu_ape: {
        type: String,
        required: true
    },
    usu_dni: String,
    usu_eml: {
        type: String,
        required: true
    },
    usu_salt: String,
    usu_hash: String,
    usu_tel: [
        fonoSchema
    ],
    usu_vst: [
        visitaSchema
    ]
}, {
    timestamps: true
});
exports.usuarioSchema.methods.cifrarContraseña = function (password) {
    this.usu_salt = crypto_1.default.randomBytes(16).toString('hex');
    this.usu_hash = crypto_1.default.pbkdf2Sync(password, this.usu_salt, 1000, 64, 'sha512').toString('hex');
};
exports.usuarioSchema.methods.verificarContraseña = function (password) {
    var temporal = crypto_1.default.pbkdf2Sync(password, this.usu_salt, 1000, 64, 'sha512').toString('hex');
    if (temporal == this.usu_hash) {
        return true;
    }
    else {
        return false;
    }
};
