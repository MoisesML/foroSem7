import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import { Usuario } from "../config/mongoose";

export var crearUsuario = (req: Request, res: Response) => {
  let objUsuario: any = new Usuario(req.body);
  objUsuario.cifrarContraseña(req.body.password);
  objUsuario.save((error: CallbackError, nuevoUsuario: Document) => {
    if (error) {
      res.status(500).json({
        ok: false,
        content: error,
        message: "Hubo un error al crear el usuario",
      });
    } else {
      res.status(201).json({
        ok: true,
        content: nuevoUsuario,
        message: "Se creo el usuario correctamente",
      });
    }
  });
};

export var loginUsuario = (req: Request, res: Response) => {
  let { correo, password } = req.body;
  console.log(password);
  if (password === undefined) {
    res.json({
      ok: false,
      content: null,
      message: "Falta password",
    });
  } else {
    Usuario.findOne({ usu_eml: correo }, (error: any, usuario: any) => {
      if (usuario) {
        let verificacion = usuario.verificarContraseña(password);
        if (verificacion) {
          res.json({
            ok: true,
            content: "token",
            message: "Bienvenido",
          });
        } else {
          res.status(400).json({
            ok: false,
            content: null,
            message: "Contraseña incorrecta",
          });
        }
      } else {
        res.status(404).json({
          ok: false,
          content: error,
          message: "El usuario no existe",
        });
      }
    });
  }
};

export var traerUsuarios = (req: Request, res: Response) => {
  Usuario.find((error, usuarios) => {
    if (error) {
      res.status(500).json({
        ok: false,
        content: error,
        message: "Hubo un error al traer los usuarios",
      });
    } else {
      res.json({
        ok: true,
        content: usuarios,
        message: null,
      });
    }
  });
};

export var agregarVisita = (req:Request, res:Response) => {
  let {id} = req.params;
  Usuario.findById(id, (error:CallbackError, resultado:any) => {
    if (!error) {
      resultado.usu_vst.push(req.body);
      resultado.save();
      res.status(201).json({
        ok : true,
        content : resultado,
        message : 'Se registro la visita'
      })
    } else {
      res.status(500).json({
        ok : false,
        content : error,
        message : 'Hubo un error al registrar la visita'
      })
    }
  })
}

export var agregarfono = (req:Request, res:Response) => {
  let {id} = req.params;
  Usuario.findById(id, (error:CallbackError, resultado:any) => {
    if (!error) {
      resultado.usu_tel.push(req.body);
      resultado.save();
      res.status(201).json({
        ok : true,
        content : resultado,
        message : 'Se registro el fono'
      })
    } else {
      res.status(500).json({
        ok : false,
        content : error,
        message : 'Hubo un error al registrar el fono'
      })
    }
  })
}