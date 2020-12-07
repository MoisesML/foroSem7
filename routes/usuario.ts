import { Router } from 'express'
import { crearUsuario, traerUsuarios, loginUsuario, agregarVisita, agregarfono } from '../controllers/usuario'

export var usuario_router = Router();

usuario_router.post('/registro', crearUsuario);
usuario_router.post('/login', loginUsuario);
usuario_router.get('/usuarios', traerUsuarios);
usuario_router.post('/visitas/:id', agregarVisita);
usuario_router.post('/fonos/:id', agregarfono);