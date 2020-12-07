"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Header', 'Content-Type, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            next();
        });
        this.puerto = process.env.PORT || 5000;
        this.configurarBodyParser();
        // this.conectarMongo();
        this.iniciarServidor();
    }
    Server.prototype.configurarBodyParser = function () {
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(body_parser_1.default.json());
    };
    Server.prototype.rutas = function () {
        this.app.get('/', function (req, res) {
            res.send('Bienvenido a la API');
        });
    };
    Server.prototype.iniciarServidor = function () {
        var _this = this;
        this.app.listen(this.puerto, function () {
            console.log('Servidor corriendo exitosamente en el puerto', _this.puerto);
        });
    };
    return Server;
}());
exports.default = Server;
