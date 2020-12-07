import { usuarioSchema } from '../models/usuarios';
import { model } from 'mongoose';

export var Usuario = model('usuario', usuarioSchema);