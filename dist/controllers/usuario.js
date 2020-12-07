"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agregarfono = exports.agregarVisita = exports.traerUsuarios = exports.loginUsuario = exports.crearUsuario = void 0;
var mongoose_1 = require("../config/mongoose");
var crearUsuario = function (req, res) {
    var objUsuario = new mongoose_1.Usuario(req.body);
    objUsuario.cifrarContraseña(req.body.password);
    objUsuario.save(function (error, nuevoUsuario) {
        if (error) {
            res.status(500).json({
                ok: false,
                content: error,
                message: "Hubo un error al crear el usuario",
            });
        }
        else {
            res.status(201).json({
                ok: true,
                content: nuevoUsuario,
                message: "Se creo el usuario correctamente",
            });
        }
    });
};
exports.crearUsuario = crearUsuario;
var loginUsuario = function (req, res) {
    var _a = req.body, correo = _a.correo, password = _a.password;
    console.log(password);
    if (password === undefined) {
        res.json({
            ok: false,
            content: null,
            message: "Falta password",
        });
    }
    else {
        mongoose_1.Usuario.findOne({ usu_eml: correo }, function (error, usuario) {
            if (usuario) {
                var verificacion = usuario.verificarContraseña(password);
                if (verificacion) {
                    res.json({
                        ok: true,
                        content: "token",
                        message: "Bienvenido",
                    });
                }
                else {
                    res.status(400).json({
                        ok: false,
                        content: null,
                        message: "Contraseña incorrecta",
                    });
                }
            }
            else {
                res.status(404).json({
                    ok: false,
                    content: error,
                    message: "El usuario no existe",
                });
            }
        });
    }
};
exports.loginUsuario = loginUsuario;
var traerUsuarios = function (req, res) {
    mongoose_1.Usuario.find(function (error, usuarios) {
        if (error) {
            res.status(500).json({
                ok: false,
                content: error,
                message: "Hubo un error al traer los usuarios",
            });
        }
        else {
            res.json({
                ok: true,
                content: usuarios,
                message: null,
            });
        }
    });
};
exports.traerUsuarios = traerUsuarios;
var agregarVisita = function (req, res) {
    var id = req.params.id;
    mongoose_1.Usuario.findById(id, function (error, resultado) {
        if (!error) {
            resultado.usu_vst.push(req.body);
            resultado.save();
            res.status(201).json({
                ok: true,
                content: resultado,
                message: 'Se registro la visita'
            });
        }
        else {
            res.status(500).json({
                ok: false,
                content: error,
                message: 'Hubo un error al registrar la visita'
            });
        }
    });
};
exports.agregarVisita = agregarVisita;
var agregarfono = function (req, res) {
    var id = req.params.id;
    mongoose_1.Usuario.findById(id, function (error, resultado) {
        if (!error) {
            resultado.usu_tel.push(req.body);
            resultado.save();
            res.status(201).json({
                ok: true,
                content: resultado,
                message: 'Se registro el fono'
            });
        }
        else {
            res.status(500).json({
                ok: false,
                content: error,
                message: 'Hubo un error al registrar el fono'
            });
        }
    });
};
exports.agregarfono = agregarfono;
