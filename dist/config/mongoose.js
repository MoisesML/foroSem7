"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
var usuarios_1 = require("../models/usuarios");
var mongoose_1 = require("mongoose");
exports.Usuario = mongoose_1.model('usuario', usuarios_1.usuarioSchema);
